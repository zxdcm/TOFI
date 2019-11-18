using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Deposit_2.Context
{
    public class ApplicationContextDbFactory : IDesignTimeDbContextFactory<UserContext>
    {
        UserContext IDesignTimeDbContextFactory<UserContext>.CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<UserContext>();
            optionsBuilder
                .UseSqlite(@"Data Source=Users.db;");
            return new UserContext(optionsBuilder.Options);
        }
    }
}
