using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProchocBackend.Database;

namespace ProchocBackend.Controllers
{
    [Route("api/prochoc")]
    public class APIController : ControllerBase
    {
        private static List<Product> _basket = new();
        
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

        private void CreateDefaultProduct(Product product)
        {
            if (!_db.Products.Any(x => x.Name == product.Name))
            {
                _db.Products.Add(product);
                _db.SaveChanges();
            }
        }
        private void CreateDefaultUser(Customer customer)
        {
            if (!(_db.Customers.Any(x => x.FirstName == customer.FirstName && x.LastName == customer.LastName)))
            {
                _db.Customers.Add(customer);
                _db.SaveChanges();
                
                _db.Baskets.Add(new Basket()
                {
                    Customer = customer,
                    ProductEntries = new List<BasketProduct>()
                });
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

        public record BasketRequestModel(string CustomerId, string ProductId, string Amount);
        
        [HttpPost]
        [Route("addToBasket")]
        public async Task<ActionResult> AddToBasket([FromBody] BasketRequestModel requestModel)
        {
            // Find product
            var product = await _db.Products.FirstOrDefaultAsync(x => x.Id.ToString() == requestModel.ProductId);
            var amount = int.Parse(requestModel.Amount);
            if (product == null) return NotFound(); // Invalid or unavailable product given

            var basket = _db.Baskets.First(b => b.Customer.CustomerId.ToString() == requestModel.CustomerId);
            basket.ProductEntries.Add(new BasketProduct()
            {
                Amount = amount,
                Basket = basket,
                Product = product
            });
            _db.Baskets.Update(basket);
            _db.SaveChanges();
            return Ok();
        }

        [HttpPost]
        [Route("removeFromBasket")]
        public async Task<ActionResult> RemoveFromBasket([FromBody] BasketRequestModel requestModel)
        {
            // Find product
            var product = await _db.Products.FirstOrDefaultAsync(x => x.Id.ToString() == requestModel.ProductId);
            if (product == null) return NotFound(); // Invalid or unavailable product given

            _basket = _basket.Where(x => x.Id.ToString() != requestModel.ProductId).ToList();
            return Ok();
        }
        
        public record GetBasketModel(string CustomerId);

        [HttpPost]
        [Route("getBasket")]
        public IEnumerable GetBasket([FromBody] GetBasketModel model)
        {
            var basket = _db.Baskets.First(b => b.Customer.CustomerId.ToString() == model.CustomerId);
            return basket.ProductEntries;
        }
    }
}