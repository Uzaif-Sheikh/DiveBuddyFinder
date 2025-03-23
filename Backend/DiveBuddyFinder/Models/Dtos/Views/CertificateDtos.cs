using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models.Dtos.Views {
    public class CertificateDto {
        public Guid Id {get; set;}
        
        public string Name {get; set;}
        
        public string Agency {get; set;}
        
        public string Url {get; set;}

    }
}