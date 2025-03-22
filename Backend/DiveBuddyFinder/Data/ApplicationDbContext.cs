using DiveBuddyFinder.Models;
using Microsoft.EntityFrameworkCore;

namespace DiveBuddyFinder.Data {
    public class ApplicationDbContext : DbContext {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<Diver> divers {get; set;}
    }
}