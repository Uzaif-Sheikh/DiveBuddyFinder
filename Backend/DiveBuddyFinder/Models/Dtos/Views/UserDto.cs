
using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models.Dtos.Views {
    public class UserDto {
        public Guid Id {get; set;}

        public string Email { get; set;}

        public string Role {get; set;}

        public bool isVerified {get; set;}
    }
}