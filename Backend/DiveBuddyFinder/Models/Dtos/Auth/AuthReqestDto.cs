using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models.Dtos.Auth {
    public class AuthRequestDto {
        [Required]
        public string Email {get; set;}
        
        [Required]
        public string Password {get; set;}
        
    }
}