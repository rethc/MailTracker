using System.ComponentModel.DataAnnotations;

namespace MailTrackerAPI.Models
{
    public class Person
    {
        [Key]
        public int PersonID { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} value cannot exceed {1} characters.")]
        public string? PersonName { get; set; }
    }
}
