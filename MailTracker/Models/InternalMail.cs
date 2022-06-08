using System.ComponentModel.DataAnnotations; 

namespace MailTrackerAPI.Models
{
    public class InternalMail
    {
        [Key]
        public int InternalMailID { get; set; }

        [Required]
        [StringLength(255, ErrorMessage = "The {0} value cannot exceed {1} characters.")]
        public string? Contents { get; set; }

        [StringLength(50, ErrorMessage = "The {0} value cannot exceed {1} characters.")]
        public string? CollectedBy { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? DateCollected { get; set; }
         
        public int TeamID { get; set; }
        public Team? Team { get; set; }

    }
}
