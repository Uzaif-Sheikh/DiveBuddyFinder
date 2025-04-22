
using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models {
    public class ResetPwd {

        public Guid Id {get; set;}

        [Required]
        public DateTime ExpireTime {get; set;}

        public bool used {get; set;} = false;

        [Required]
        public Guid UserId {get; set;}

        public User User {get; set;}
    }
}