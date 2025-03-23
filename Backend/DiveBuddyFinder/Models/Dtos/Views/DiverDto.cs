using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models.Dtos.Views {
    public class DiverDto {
        public Guid UserId {get; set;}
        
        public string FirstName {get; set;}

        public string? LastName {get; set;}

        public string Email {get; set;}

        public string Password {get; set;}

        public int NumberOfDives {get; set;}

        public string? Bio {get; set;}

        public string? Image {get; set;}

        public int Age {get; set;}

        public LocationDto Location {get; set;}

        public DateTime LastActive {get; set;}
        
        public List<CertificateDto> Certificates {get; set;}

    }
}