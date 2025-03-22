using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models {
    public class Location {
        public Guid id {get; set;}
        
        [Required]
        public string Suburb { get; set;}

        public int PostCode {get; set;}
        
        public List<Diver> Divers {get; set;}

    }
}