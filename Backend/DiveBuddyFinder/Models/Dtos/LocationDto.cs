using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models.Dtos {
    public class LocationDto {
        public Guid id {get; set;}
        
        [Required]
        public string Suburb { get; set;}
        
        [Required]
        public int PostCode {get; set;}
        
    }
}