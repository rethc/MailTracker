using Microsoft.EntityFrameworkCore;

namespace MailTrackerAPI.Models
{
    public class MailTrackerDbContext:DbContext
    {
        public MailTrackerDbContext(DbContextOptions<MailTrackerDbContext> options):base(options)
        {
           
        }

        public DbSet<ExternalMail>? ExternalMails { get; set; }
        public DbSet<InternalMail>? InternalMails { get; set; }
        public DbSet<Person>? Persons { get; set; }
        public DbSet<Team>? Teams { get; set; }
    }
}
