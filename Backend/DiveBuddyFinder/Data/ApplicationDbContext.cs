using DiveBuddyFinder.Models;
using Microsoft.EntityFrameworkCore;

namespace DiveBuddyFinder.Data {
    public class ApplicationDbContext : DbContext {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<Diver> Divers {get; set;}

        public DbSet<User> Users {get; set;}

        public DbSet<CertificateDetails> CertificateDetails {get; set;}

        public DbSet<Certificates> Certificates {get; set;}

        public DbSet<Location> Locations {get; set;}

        public DbSet<RefreshToken> RefreshTokens {get; set;}

        public DbSet<UserVerification> UserVerifications {get; set;}

        public DbSet<ResetPwd> ResetPwds {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Certificates>()
                        .HasKey(c => new {c.CertificateDetailsId, c.DiverId});
            
            modelBuilder.Entity<Diver>()
                        .HasKey(d => d.UserId);

            modelBuilder.Entity<Diver>()
                        .HasOne(d => d.User)
                        .WithOne(d => d.Diver)
                        .HasForeignKey<Diver>(d => d.UserId);
            
            modelBuilder.Entity<Location>()
                        .HasKey(l => l.PostCode);    
        }
    }
}