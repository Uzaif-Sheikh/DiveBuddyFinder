using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models {
    public class Certificates {
        public Guid Id {get; set;}

        public CertificateDetails CertificateDetails {get; set;}

        [Required]
        public Guid DiverId {get; set;}
        
        public Diver Diver {get; set;}

    }
}