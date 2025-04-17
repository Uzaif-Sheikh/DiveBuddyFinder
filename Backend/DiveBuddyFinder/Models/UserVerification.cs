
using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models {
    public class UserVerification {

        public Guid Id {get; set;}

        [Required]
        public int VerificationCode {get; set;}

        [Required]
        public DateTime ExpireTime {get; set;}

        public Guid UserId {get; set;}

        public User User {get; set;}
    }
}