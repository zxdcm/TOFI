using Deposit_2.Models;
using Microsoft.EntityFrameworkCore;

namespace Deposit_2.Context
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public UserContext(string connectionString) : base()
        {

        }

        public UserContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlite(@"Data Source=Users.db;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");
        }
    }
}
