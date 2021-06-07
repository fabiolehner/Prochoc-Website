namespace ProchocBackend.Database
{
    public class BasketProduct
    {
        public int Id { get; set; }
        
        public Basket Basket { get; set; }
        public Product Product { get; set; }
        public int Amount { get; set; }
    }
}