using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models.Dtos.Auth {
    public class ResetPwdRequestDto {
        [Required]
        public Guid Token {get; set;}
        
        [Required]
        public string Password {get; set;}
        
    }
}