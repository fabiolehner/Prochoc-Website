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

        public record BasketRequestModel(string ProductId);
        
        [HttpPost]
        [Route("addToBasket")]
        public async Task<ActionResult> AddToBasket([FromBody] BasketRequestModel requestModel)
        {
            // Find product
            var product = await _db.Products.FirstOrDefaultAsync(x => x.Id.ToString() == requestModel.ProductId);
            if (product == null) return NotFound(); // Invalid or unavailable product given

            _basket.Add(product);
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
        
        [HttpGet]
        [Route("getBasket")]
        public IEnumerable GetBasket()
        {
            return _basket;
        }
    }
}
