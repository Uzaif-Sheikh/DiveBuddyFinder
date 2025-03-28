using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models.Dtos.Auth {
    public class LogoutRequestDto {
        [Required]
        public Guid Id {get; set;}
    }
}