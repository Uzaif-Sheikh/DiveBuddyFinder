using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiveBuddyFinder.Models {
    public class Certificates {
        [Required]
        [ForeignKey("CertificateDetails")]
        public Guid CertificateDetailsId {get; set;}
        public CertificateDetails CertificateDetails {get; set;}

        [Required]
        [ForeignKey("Diver")]
        public Guid DiverId {get; set;}
        public Diver Diver {get; set;}

    }
}