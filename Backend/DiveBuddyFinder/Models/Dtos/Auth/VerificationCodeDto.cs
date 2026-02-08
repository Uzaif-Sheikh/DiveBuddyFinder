using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models.Dtos.Auth {
    public class VerificationCodeDto {
        [Required]
        public string Email {get; set;}
        
    }
}