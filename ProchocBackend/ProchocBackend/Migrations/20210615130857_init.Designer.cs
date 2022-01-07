﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProchocBackend.Database;

namespace ProchocBackend.Migrations
{
    [DbContext(typeof(ProchocDbContext))]
<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Migrations/20210615130857_init.Designer.cs
    [Migration("20210615130857_init")]
    partial class init
=======
    [Migration("20211221122641_Initial")]
    partial class Initial
>>>>>>> Stashed changes:ProchocBackend/Migrations/20211221122641_Initial.Designer.cs
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ProchocBackend.Database.Basket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int");

<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Migrations/20210615130857_init.Designer.cs
=======
                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("TotalPrice")
                        .HasColumnType("int");

>>>>>>> Stashed changes:ProchocBackend/Migrations/20211221122641_Initial.Designer.cs
                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.ToTable("Baskets");
                });

            modelBuilder.Entity("ProchocBackend.Database.BasketProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<int?>("BasketId")
                        .HasColumnType("int");

                    b.Property<int?>("ProductId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BasketId");

                    b.HasIndex("ProductId");

                    b.ToTable("BasketProducts");
                });

            modelBuilder.Entity("ProchocBackend.Database.Customer", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Migrations/20210615130857_init.Designer.cs
                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .HasColumnType("longtext");

                    b.Property<string>("LastName")
                        .HasColumnType("longtext");
=======
                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Picture")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Price")
                        .HasColumnType("nvarchar(max)");
>>>>>>> Stashed changes:ProchocBackend/Migrations/20211221122641_Initial.Designer.cs

                    b.HasKey("CustomerId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("ProchocBackend.Database.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

<<<<<<< Updated upstream:ProchocBackend/ProchocBackend/Migrations/20210615130857_init.Designer.cs
                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("Picture")
                        .HasColumnType("longtext");

                    b.Property<string>("Price")
                        .HasColumnType("longtext");
=======
                    b.Property<string>("BillingAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");
>>>>>>> Stashed changes:ProchocBackend/Migrations/20211221122641_Initial.Designer.cs

                    b.HasKey("Id");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("ProchocBackend.Database.Basket", b =>
                {
                    b.HasOne("ProchocBackend.Database.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId");

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("ProchocBackend.Database.BasketProduct", b =>
                {
                    b.HasOne("ProchocBackend.Database.Basket", "Basket")
                        .WithMany()
                        .HasForeignKey("BasketId");

                    b.HasOne("ProchocBackend.Database.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId");

                    b.Navigation("Basket");

                    b.Navigation("Product");
                });
#pragma warning restore 612, 618
        }
    }
}
