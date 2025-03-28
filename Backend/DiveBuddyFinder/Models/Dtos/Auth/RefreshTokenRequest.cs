using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models.Dtos.Auth {
    public class RefreshTokenRequest {
        [Required]
        public string Token {get; set;}
    }
}