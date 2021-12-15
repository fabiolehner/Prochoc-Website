using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProchocBackend.Database;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;

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
                Price = "4,99",
                Picture ="product1.png"
            });
            CreateDefaultProduct(new Product()
            {
                Name = "PROCHOC Himbeere",
                Price = "4,99",
                Picture = "product2.png"
            });
            CreateDefaultProduct(new Product()
            {
                Name = "PROCHOC Blaubeere",
                Price = "4,99",
                Picture = "product3.png"
            });
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
        [Route("getProducts")]
        public async Task<IEnumerable> GetProducts()
        {
            return await _db.Products.ToListAsync();
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
            var toRemove = await _db.BasketProducts.Where(bp => bp.Product.Id == product.Id)
                .Include(bp => bp.Product).Include(bp => bp.Basket).ToListAsync();

            foreach (var bp in toRemove)
                _db.BasketProducts.Remove(bp);

            _db.Products.Remove(entry);
            await _db.SaveChangesAsync();
            return Ok();
        }

        public record BasketRequestModel(string CustomerId, string ProductId, string Amount);
        
        [HttpPost]
        [Route("addToBasket")]
        public async Task<ActionResult> AddToBasket([FromBody] BasketRequestModel requestModel)
        {
            // Find product
            var product = await _db.Products.FirstOrDefaultAsync(x => x.Id.ToString() == requestModel.ProductId);
            var amount = int.Parse(requestModel.Amount);
            if (product == null) return NotFound(); // Invalid or unavailable product given

            //var basket = await _db.Baskets.Where(b => b.Customer.CustomerId.ToString() == requestModel.CustomerId)
            //    .Include(b => b.Customer)
            //    .FirstOrDefaultAsync();
            
            //var newEntry = new BasketProduct()
            //{
            //    Amount = amount,
            //    Basket = basket,
            //    Product = product
            //};
            //await _db.BasketProducts.AddAsync(newEntry);
            //await _db.SaveChangesAsync();
            
            return Ok();
        }

        [HttpPost]
        [Route("removeFromBasket")]
        public async Task<ActionResult> RemoveFromBasket([FromBody] BasketRequestModel requestModel)
        {
            //var basketProduct = _db.BasketProducts
            //    .Where(bp => bp.Basket.Customer.CustomerId.ToString() == requestModel.CustomerId)
            //    .Where(bp => bp.Amount.ToString() == requestModel.Amount)
            //    .Where(bp => bp.Product.Id.ToString() == requestModel.ProductId)
            //    .Include(bp => bp.Basket)
            //    .Include(bp => bp.Basket.Customer)
            //    .Include(bp => bp.Product)
            //    .ToList()
            //    .FirstOrDefault();

            //if (basketProduct == null) return NotFound();
            //_db.BasketProducts.Remove(basketProduct);
            //await _db.SaveChangesAsync();
            return Ok();
        }
        
        public record GetBasketModel(string CustomerId);

        //[HttpPost]
        //[Route("getBasket")]
        //public IEnumerable GetBasket([FromBody] GetBasketModel model)
        //{
        //var basketProduct = _db.BasketProducts
        //    .Where(bp => bp.Basket.Customer.CustomerId.ToString() == model.CustomerId)
        //    .Include(bp => bp.Basket)
        //    .Include(bp => bp.Basket.Customer)
        //    .Include(bp => bp.Product)
        //    .ToList();

        //return basketProduct.Select(bp => new
        //{
        //    Amount = bp.Amount,
        //    Product = bp.Product
        //});
        //}

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
                PasswordHash = System.Convert.ToBase64String(hashedPassword)
            };
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();
           await _db.Baskets.AddAsync(new Basket { User = user });
            return Ok();
        }

        public record LoginModel(string Email, string Password);
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] LoginModel model)
        {
            var shaM = new SHA512Managed();
            var hashedPassword = shaM.ComputeHash(Encoding.UTF8.GetBytes(model.Password));
            var passwordHashB64 = System.Convert.ToBase64String(hashedPassword);

            var user = _db.Users.Where(x => x.Email == model.Email).FirstOrDefault();
            if (user == null || user.PasswordHash != passwordHashB64)
            {
                return Unauthorized();
            }

            return Ok(new { Token = JwtUtil.CreateJwtFromUser(user) });
        }

        [Authorize]
        [HttpGet]
        [Route("test")]
        public IEnumerable Test()
        {
            return Enumerable.Range(0, 10);
        }
    }
}