using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models.Dtos.Views {
    public class LocationDto {
        public Guid Id {get; set;}
        
        public string Suburb { get; set;}
        
        public int PostCode {get; set;}
        
    }
}