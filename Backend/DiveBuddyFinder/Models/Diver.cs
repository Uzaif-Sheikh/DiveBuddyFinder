using System.ComponentModel.DataAnnotations;

namespace DiveBuddyFinder.Models {
    public class Diver {
        public Guid UserId {get; set;}

        public User User {get; set;}

        [Required]
        [StringLength(16, ErrorMessage = "Maximum length for first name is 16.")]
        public string FirstName {get; set;}

        [StringLength(16, ErrorMessage = "Maximum length for last name is 16.")]
        public string? LastName {get; set;}

        [Required]
        public int NumberOfDives {get; set;}

        public string? Bio {get; set;}

        public string? Image {get; set;}

        [Required]
        [Range(18, 90, ErrorMessage = "Age Should be between the range 18 - 90.")]
        public int Age {get; set;}

        [Required]
        public Guid LocationId {get; set;}

        [Required]
        public Location Location {get; set;}


        [Required]
        public DateTime LastActive {get; set;}
        
        [Required]
        public List<Certificates> Certificates {get; set;}

    }
}