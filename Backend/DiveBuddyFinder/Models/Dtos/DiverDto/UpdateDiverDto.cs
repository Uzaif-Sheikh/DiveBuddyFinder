using System.ComponentModel.DataAnnotations;
using DiveBuddyFinder.Models.Dtos.Views;

namespace DiveBuddyFinder.Models.Dtos.DiverDto {
    public class UpdateDiverDto {
        [Required]
        public string FirstName {get; set;}

        public string? LastName {get; set;}
        [Required]

        public int NumberOfDives {get; set;}

        public string? Bio {get; set;}

        public string? Image {get; set;}
        [Required]

        public int Age {get; set;}
        [Required]

        public int PostCode {get; set;}
        
        public List<Guid> CertificatesId {get; set;}

    }
}