using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models {
    public class Location {
        public int PostCode {get; set;}
        [Required]
        public string Suburb { get; set;}
        [Required]
        public string State {get; set;}
        [Required]
        public string CountryCode {get; set;}
    }
}