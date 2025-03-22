using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models.Dtos {
    public class CertificateDto {
        public Guid Id {get; set;}
        
        [Required]
        public string Name {get; set;}
        
        [Required]
        public string Agency {get; set;}
        
        [Required]
        public string Url {get; set;}

    }
}