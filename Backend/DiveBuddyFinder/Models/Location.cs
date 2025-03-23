using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models {
    public class Location {
        public Guid Id {get; set;}
        
        [Required]
        public string Suburb { get; set;}

        public int PostCode {get; set;}
        
    }
}