using System.ComponentModel.DataAnnotations;

namespace MailTrackerAPI.Models
{
    public class ExternalMail
    {
        [Key]
        public int ExternalMailID { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "The {0} value cannot exceed {1} characters.")]
        public string? MailType { get; set; }

        [Required]
        [StringLength(255, ErrorMessage = "The {0} value cannot exceed {1} characters.")]
        public string? TrackingNo { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime? DateCreated { get; set; }
    }
}
