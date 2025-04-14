
namespace DiveBuddyFinder.Models.Dtos.Views {
    public class DiverViewDto {
        public Guid UserId {get; set;}
        
        public string FirstName {get; set;}

        public string? LastName {get; set;}

        public int NumberOfDives {get; set;}

        public string Bio {get; set;}

        public string Image {get; set;}

        public int Age {get; set;}

        public LocationDto Location {get; set;}
 
    }
}