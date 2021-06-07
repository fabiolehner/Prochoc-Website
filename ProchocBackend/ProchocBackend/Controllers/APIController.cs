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
                    Customer = customer
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
            
            return Ok();
        }

        [HttpPost]
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
        }
    }
}