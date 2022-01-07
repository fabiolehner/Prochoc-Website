<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Database/Product.cs
﻿using System.ComponentModel.DataAnnotations;
=======
using System.ComponentModel.DataAnnotations;
>>>>>>> Stashed changes:ProchocBackend/Database/Product.cs
using System.Diagnostics.CodeAnalysis;

namespace ProchocBackend.Database
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        
        [NotNull]
        public string Name { get; set; }
        
        [NotNull]
        public string Price { get; set; }
        [NotNull]
        public string Picture { get; set; }
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Database/Product.cs
=======

        public int Stock { get; set; }

        public string Description { get; set; }
>>>>>>> Stashed changes:ProchocBackend/Database/Product.cs
    }
}