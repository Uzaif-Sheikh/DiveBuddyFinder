using System.ComponentModel.DataAnnotations;
using DiveBuddyFinder.Models.Dtos.Views;

namespace DiveBuddyFinder.Models.Dtos.DiverDto {
    public class CreateCertificateDto {
        [Required]
       public string Name {get; set;}
        [Required]
        
        public string Agency {get; set;}
        [Required]
        
        public string Url {get; set;}

    }
}