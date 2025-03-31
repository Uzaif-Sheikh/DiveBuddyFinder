using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models.Dtos.Views {
    public class LocationDto {
        public int PostCode {get; set;}
        public string Suburb { get; set;}
        public string State {get; set;}
        public string CountryCode {get; set;}        
    }
}