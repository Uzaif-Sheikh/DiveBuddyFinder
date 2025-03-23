
using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models {
    public class RefreshToken {
        public Guid Id {get; set;}

        [Required]
        public string Token { get; set;}

        [Required]
        public Guid UserId {get; set;}
        
        [Required]
        public DateTime ExpiresOnUtc {get; set;}

        public User User {get; set;}

    }
}