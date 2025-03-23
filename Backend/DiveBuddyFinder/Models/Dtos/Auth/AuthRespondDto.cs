
namespace DiveBuddyFinder.Models.Dtos.Auth {
    public class AuthRespondDto {
        public Guid UserId {get; set;}
        public string AccessToken {get; set;}
        public string RefreshToken {get; set;}
    }
}