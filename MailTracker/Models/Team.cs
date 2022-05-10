using System.ComponentModel.DataAnnotations;

namespace MailTrackerAPI.Models
{
    public class Team
    {
        [Key]
        public int TeamID { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} value cannot exceed {1} characters.")]
        public string? TeamName { get; set; }
    }
}
