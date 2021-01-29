using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Context
{
    public class GrafisTestContext : DbContext
    {
        public GrafisTestContext(DbContextOptions<GrafisTestContext> options) : base(options)
        { }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Request> Requests { get; set; }

        public DbSet<RequestProduct> RequestProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RequestProduct>().HasKey(u => new
            {
                u.IdProduct,
                u.IdRequest
            });

        }
    }
}
