<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Controllers/APIController.cs
﻿using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProchocBackend.Database;
=======
﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProchocBackend.Database;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
>>>>>>> Stashed changes:ProchocBackend/Controllers/APIController.cs

namespace ProchocBackend.Controllers
{
    [Route("api/prochoc")]
    public class APIController : ControllerBase
    {
        private readonly ProchocDbContext _db;
        public APIController(ProchocDbContext context)
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Controllers/APIController.cs
        { 
=======
        {
>>>>>>> Stashed changes:ProchocBackend/Controllers/APIController.cs
            _db = context;
            CreateDefaultProduct(new Product()
            {
                Name = "PROCHOC Erdbeere",
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Controllers/APIController.cs
                Price = "4,99",
                Picture ="product1.png"
=======
                Price = "4.99",
                Picture = "/assets/images/product1.png"
>>>>>>> Stashed changes:ProchocBackend/Controllers/APIController.cs
            });
            CreateDefaultProduct(new Product()
            {
                Name = "PROCHOC Himbeere",
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Controllers/APIController.cs
                Price = "4,99",
                Picture = "product2.png"
=======
                Price = "4.99",
                Picture = "/assets/images/product2.png"
>>>>>>> Stashed changes:ProchocBackend/Controllers/APIController.cs
            });
            CreateDefaultProduct(new Product()
            {
                Name = "PROCHOC Blaubeere",
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Controllers/APIController.cs
                Price = "4,99",
                Picture = "product3.png"
            });
            CreateDefaultUser(new Customer()
            {
                FirstName = "Admin",
                LastName = "Admin",
                Email = "test@admin.at"
            });
            CreateDefaultUser(new Customer()
            {
                FirstName = "Franz",
                LastName = "Huaba",
                Email = "test@huaba.at"
            });
        }

=======
                Price = "4.99",
                Picture = "/assets/images/product3.png"
            });
        }

        private string GetUser()
        {
            return HttpContext.User.Claims.Where(x => x.Type.Contains("email"))
                .FirstOrDefault()?.Value.Replace("\"", "");
        }

>>>>>>> Stashed changes:ProchocBackend/Controllers/APIController.cs
        private void CreateDefaultProduct(Product product)
        {
            if (!_db.Products.Any(x => x.Name == product.Name))
            {
                _db.Products.Add(product);
                _db.SaveChanges();
            }
        }
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Controllers/APIController.cs
        private void CreateDefaultUser(Customer customer)
        {
            if (!(_db.Customers.Any(x => x.FirstName == customer.FirstName && x.LastName == customer.LastName)))
            {
                _db.Customers.Add(customer);
                _db.SaveChanges();
                
                _db.Baskets.Add(new Basket()
                {
                    Customer = customer
                });
                _db.SaveChanges();
            }
        }
=======
>>>>>>> Stashed changes:ProchocBackend/Controllers/APIController.cs

        [HttpGet]
        [Route("getProducts")]
        public async Task<IEnumerable> GetProducts()
        {
            return await _db.Products.ToListAsync();
        }
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Controllers/APIController.cs
        
=======

        [HttpGet]
        [Route("getProductById")]
        public async Task<Product> GetProductById([FromQuery] int id)
        {
            return await _db.Products.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

>>>>>>> Stashed changes:ProchocBackend/Controllers/APIController.cs
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
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Controllers/APIController.cs
            var toRemove = await _db.BasketProducts.Where(bp => bp.Product.Id == product.Id)
                .Include(bp => bp.Product).Include(bp => bp.Basket).ToListAsync();

            foreach (var bp in toRemove)
                _db.BasketProducts.Remove(bp);

=======
>>>>>>> Stashed changes:ProchocBackend/Controllers/APIController.cs
            _db.Products.Remove(entry);
            await _db.SaveChangesAsync();
            return Ok();
        }

<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Controllers/APIController.cs
        public record BasketRequestModel(string CustomerId, string ProductId, string Amount);
        
        [HttpPost]
=======
        public record BasketRequestModel(int ProductId, int Count);
        [HttpPost]
        [Authorize]
>>>>>>> Stashed changes:ProchocBackend/Controllers/APIController.cs
        [Route("addToBasket")]
        public async Task<ActionResult> AddToBasket([FromBody] BasketRequestModel requestModel)
        {
            // Find product
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Controllers/APIController.cs
            var product = await _db.Products.FirstOrDefaultAsync(x => x.Id.ToString() == requestModel.ProductId);
            var amount = int.Parse(requestModel.Amount);
            if (product == null) return NotFound(); // Invalid or unavailable product given

            var basket = await _db.Baskets.Where(b => b.Customer.CustomerId.ToString() == requestModel.CustomerId)
                .Include(b => b.Customer)
                .FirstOrDefaultAsync();
            
            var newEntry = new BasketProduct()
            {
                Amount = amount,
                Basket = basket,
                Product = product
            };
            await _db.BasketProducts.AddAsync(newEntry);
            await _db.SaveChangesAsync();
            
=======
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

            basket.Products.Add(new BasketEntry
            {
                Product = product,
                Count = requestModel.Count
            });

            await _db.SaveChangesAsync();
>>>>>>> Stashed changes:ProchocBackend/Controllers/APIController.cs
            return Ok();
        }

        [HttpPost]
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Controllers/APIController.cs
        [Route("removeFromBasket")]
        public async Task<ActionResult> RemoveFromBasket([FromBody] BasketRequestModel requestModel)
        {
            var basketProduct = _db.BasketProducts
                .Where(bp => bp.Basket.Customer.CustomerId.ToString() == requestModel.CustomerId)
                .Where(bp => bp.Amount.ToString() == requestModel.Amount)
                .Where(bp => bp.Product.Id.ToString() == requestModel.ProductId)
                .Include(bp => bp.Basket)
                .Include(bp => bp.Basket.Customer)
                .Include(bp => bp.Product)
                .ToList()
                .FirstOrDefault();

            if (basketProduct == null) return NotFound();
            _db.BasketProducts.Remove(basketProduct);
            await _db.SaveChangesAsync();
            return Ok();
        }
        
        public record GetBasketModel(string CustomerId);

        [HttpPost]
        [Route("getBasket")]
        public IEnumerable GetBasket([FromBody] GetBasketModel model)
        {
            var basketProduct = _db.BasketProducts
                .Where(bp => bp.Basket.Customer.CustomerId.ToString() == model.CustomerId)
                .Include(bp => bp.Basket)
                .Include(bp => bp.Basket.Customer)
                .Include(bp => bp.Product)
                .ToList();

            return basketProduct.Select(bp => new
            {
                Amount = bp.Amount,
                Product = bp.Product
            });
=======
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
                x.Product.Id == requestModel.ProductId && x.Count == requestModel.Count)
                .FirstOrDefault();
            if (entry != null)
            {
                basket.Products.Remove(entry);
                _db.Baskets.Update(basket);
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
            await _db.Baskets.AddAsync(new Basket { User = user });
            await _db.SaveChangesAsync();
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
>>>>>>> Stashed changes:ProchocBackend/Controllers/APIController.cs
        }
    }
}