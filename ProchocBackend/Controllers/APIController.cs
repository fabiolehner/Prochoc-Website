using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProchocBackend.Database;
using ProchocBackend.Util;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ProchocBackend.Controllers
{
    [Route("api/prochoc")]
    public class APIController : ControllerBase
    {
        private readonly ProchocDbContext _db;
        public APIController(ProchocDbContext context)
        {
            _db = context;
            CreateDefaultProduct(new Product()
            {
                Name = "PROCHOC Erdbeere",
                Price = "4.99",
                Picture = "/assets/images/product1.png"
            });
            CreateDefaultProduct(new Product()
            {
                Name = "PROCHOC Himbeere",
                Price = "4.99",
                Picture = "/assets/images/product2.png"
            });
            CreateDefaultProduct(new Product()
            {
                Name = "PROCHOC Blaubeere",
                Price = "4.99",
                Picture = "/assets/images/product3.png"
            });
        }

        private string GetUser()
        {
            return HttpContext.User.Claims.Where(x => x.Type.Contains("email"))
                .FirstOrDefault()?.Value.Replace("\"", "");
        }

        private void CreateDefaultProduct(Product product)
        {
            if (!_db.Products.Any(x => x.Name == product.Name))
            {
                _db.Products.Add(product);
                _db.SaveChanges();
            }
        }

        [HttpGet]
        [Authorize]
        [Route("userinfo")]
        public async Task<IActionResult> GetUserInfo()
        {
            var email = GetUser();
            if (email != null)
            {
                var user = _db.Users.Where(x => x.Email == email).FirstOrDefault();
                if (user == null)
                    return Unauthorized();

                return Ok(new
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                });
            }
            return Unauthorized();
        }

        [HttpGet]
        [Route("verify")]
        public async Task<IActionResult> VerifyEmail([FromQuery] int id)
        {
            var user = _db.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
                return NotFound();

            if (user.IsVerified)
                return BadRequest();

            user.IsVerified = true;
            _db.Users.Update(user);
            await _db.SaveChangesAsync();
            return Ok("Account verification completed successfully.");
        }

        [HttpGet]
        [Route("getProducts")]
        public async Task<IEnumerable> GetProducts()
        {
            return await _db.Products.ToListAsync();
        }

        [HttpGet]
        [Route("getProductById")]
        public async Task<Product> GetProductById([FromQuery] int id)
        {
            return await _db.Products.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        [HttpPost]
        [Route("createProduct")]
        public async Task<ActionResult> CreateProduct([FromBody] Product product)
        {
            await _db.Products.AddAsync(product);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("editProduct")]
        public async Task<ActionResult> EditProduct([FromBody] Product product)
        {
            var entry = await _db.Products.FirstOrDefaultAsync(x => x.Id == product.Id);
            entry.Name = product.Name;
            entry.Picture = product.Picture;
            entry.Price = product.Price;

            _db.Products.Update(entry);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("removeProduct")]
        public async Task<ActionResult> RemoveProduct([FromBody] Product product)
        {
            var entry = await _db.Products.FirstOrDefaultAsync(x => x.Id == product.Id);
            _db.Products.Remove(entry);
            await _db.SaveChangesAsync();
            return Ok();
        }

        public record BasketRequestModel(int ProductId, int Count);
        [HttpPost]
        [Authorize]
        [Route("addToBasket")]
        public async Task<ActionResult> AddToBasket([FromBody] BasketRequestModel requestModel)
        {
            // Find product
            var product = await _db.Products.FirstOrDefaultAsync(x => x.Id == requestModel.ProductId);
            if (product == null) return NotFound(); // Invalid or unavailable product given

            var userEmail = GetUser();
            var y = _db.Baskets.Include(x => x.User).Where(x => x.User.Email == userEmail).ToList();

            var basket = await _db.Baskets
                .Include(b => b.User)
                .Where(b => b.User.Email == GetUser())
                .Include(b => b.Products)
                .FirstOrDefaultAsync();

            if (basket.Products == null)
                basket.Products = new();

            var entry = basket.Products.FirstOrDefault(x => x?.Product?.Id == requestModel.ProductId);
            if (entry == null)
            {
                basket.Products.Add(new BasketEntry
                {
                    Product = product,
                    Count = requestModel.Count
                });
            }
            else
            {
                entry.Count += requestModel.Count;
            }

            _db.Baskets.Update(basket);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Authorize]
        [Route("removeFromBasket")]
        public async Task<ActionResult> RemoveFromBasket([FromBody] BasketRequestModel requestModel)
        {
            var basket = _db.Baskets
                .Include(b => b.User)
                .Where(b => b.User.Email == GetUser())
                .Include(b => b.Products)
                .ThenInclude(p => p.Product)
                .FirstOrDefault();
            var entry = basket.Products.Where(x => 
                x.Product.Id == requestModel.ProductId)
                .FirstOrDefault();
            if (entry != null)
            {
                entry.Count -= requestModel.Count;
                if (entry.Count == 0)
                {
                    _db.BasketEntries.Remove(entry);
                    _db.Baskets.Update(basket);
                }
                else
                {
                    _db.BasketEntries.Update(entry);
                }
                await _db.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }

        [HttpGet]
        [Authorize]
        [Route("getBasket")]
        public ActionResult<IEnumerable> GetBasket()
        {
            var basket = _db.Baskets
                .Include(bp => bp.User)
                .Where(bp => bp.User.Email == GetUser())
                .Include(bp => bp.Products)
                .ThenInclude(bp => bp.Product)
                .FirstOrDefault();
            return basket?.Products.Select(x => new
            {
                Item = x.Product,
                Count = x.Count
            }).ToList();
        }

        public record PersonalInformation(string FirstName, string LastName, string Address, string City, string State, string ZipCode);
        public record DeliveryInformation(PersonalInformation PersonalInformation);
        public record CheckoutRequestModel(PersonalInformation PersonalInformation, DeliveryInformation DeliveryInformation);

        [HttpPost]
        [Authorize]
        [Route("checkout")]
        public IActionResult Checkout([FromBody] CheckoutRequestModel model)
        {
            var email = GetUser();
            var user = _db.Users.Where(x => x.Email == email).FirstOrDefault();
            if (user == null) return Unauthorized();

            var basket = _db.Baskets.Include(x => x.User).Include(x => x.Products).ThenInclude(x => x.Product)
                .Where(x => x.User.Email == email)
                .FirstOrDefault();

            MailUtil.SendCheckoutEmail(user, basket, model.DeliveryInformation);

            basket.Products.Clear();
            _db.Baskets.Update(basket);
            _db.SaveChanges();
            return Ok();
        }

        public record RegisterModel(string FirstName, string LastName, string Email,
            string BillingAddress, string Country, string Password);
        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register([FromBody] RegisterModel model)
        {
            var shaM = new SHA512Managed();
            var hashedPassword = shaM.ComputeHash(Encoding.UTF8.GetBytes(model.Password));
            var user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                BillingAddress = model.BillingAddress,
                Country = model.Country,
                PasswordHash = System.Convert.ToBase64String(hashedPassword),
                IsVerified = false
            };
            await _db.Users.AddAsync(user);
            await _db.Baskets.AddAsync(new Basket { User = user });
            await _db.SaveChangesAsync();

            MailUtil.SendVerificationMail(user);

            return Ok();
        }

        public record LoginModel(string Email, string Password);
        [HttpPost]
        [Route("login")]
        public ActionResult Login([FromBody] LoginModel model)
        {
            var shaM = new SHA512Managed();
            var hashedPassword = shaM.ComputeHash(Encoding.UTF8.GetBytes(model.Password));
            var passwordHashB64 = System.Convert.ToBase64String(hashedPassword);

            var user = _db.Users.Where(x => x.Email == model.Email).FirstOrDefault();
            if (user == null || user.PasswordHash != passwordHashB64)
            {
                return Unauthorized();
            }

            _db.Baskets.Add(new Basket { User = user });
            return Ok(new { Token = JwtUtil.CreateJwtFromUser(user) });
        }

        [HttpGet]
        [Route("test")]
        public IEnumerable Test()
        {
            return Enumerable.Range(0, 10);
        }
    }
}