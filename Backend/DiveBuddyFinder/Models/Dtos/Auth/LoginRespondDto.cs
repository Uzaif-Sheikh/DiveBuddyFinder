namespace DiveBuddyFinder.Models.Dtos.Auth {
    public class LoginRespondDto {
        public Guid UserId {get; set;}
        public string AccessToken {get; set;}
        public string RefreshToken {get; set;}
        public bool isVerified {get; set;}
    }
}