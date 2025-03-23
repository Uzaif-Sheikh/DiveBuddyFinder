using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models {
    public class CertificateDetails {
        public Guid Id {get; set;}
        
        [Required]
        public string Name {get; set;}

        public string Agency {get; set;}

        public string Url {get; set;}

        public List<Certificates> Certificates {get; set;}

    }
}