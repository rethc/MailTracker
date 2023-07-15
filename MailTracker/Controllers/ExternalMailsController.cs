#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MailTrackerAPI.Models;

namespace MailTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExternalMailsController : ControllerBase
    {
        private readonly MailTrackerDbContext _context;

        public ExternalMailsController(MailTrackerDbContext context)
        {
            _context = context;

        } 

        // GET: api/ExternalMails/GetPaged
        [HttpGet("GetPaged")]
        public async Task<ActionResult> GetPaged(int page = 0, int pageSize = 10, string sortField = "ExternalMailID", string sortDir = "desc", string trackingNo = null)
        {
            // apply the search condition
            var mails = _context.ExternalMails.AsQueryable();
            if (!string.IsNullOrEmpty(trackingNo))
            {
                mails = mails.Where(e => e.TrackingNo.Contains(trackingNo));
            }

            // apply the sorting
            if (sortDir == "desc")
            {
                mails = mails.OrderByDescending(e => EF.Property<object>(e, sortField));
            }
            else
            {
                mails = mails.OrderBy(e => EF.Property<object>(e, sortField));
            }

            // get the total count
            var totalCount = await mails.CountAsync();

            // apply pagination
            var pagedMails = await mails.Skip(page * pageSize).Take(pageSize).ToListAsync();

            return Ok(new
            {
                data = pagedMails,
                total = totalCount,
                page = page,
            });
        }


        //TEST --- Search
        // GET: api/ExternalMails/search/{trackingno}
        [HttpGet("Search/{trackingno}")]
        public async Task<ActionResult<IEnumerable<ExternalMail>>> Search(string trackingNo)
        {
            return await _context.ExternalMails.Where(x => x.TrackingNo.Contains(trackingNo)).ToListAsync();
        }

        // GET: api/ExternalMails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExternalMail>>> GetExternalMails()
        {
            return await _context.ExternalMails.ToListAsync();
        }


        // GET: api/GetLastMail/7
        [HttpGet("GetLastMail/{take}")]
        public async Task<ActionResult<IEnumerable<ExternalMail>>> GetLastMail(int take)
        {
            return await _context.ExternalMails.OrderByDescending(x => x.ExternalMailID).Take(take).ToListAsync();

        }

        // GET: api/GetMailCount/Outgoing
        [HttpGet("GetMailCount/{type}")]
        public async Task<ActionResult<int>> GetMailCount(string type)
        {
            return await _context.ExternalMails.Where(x => x.MailType == type).CountAsync();

        }

        // GET: api/GetMails/Outgoing
        [HttpGet("GetMails/{type}")]
        public ActionResult<IEnumerable<object>> GetMails(string type)
        {
            int total, passport, bdm, authentication, citizenship, other;
            total = passport = bdm = authentication = citizenship = other = 0;

            var mail = _context.ExternalMails.Where(x => x.MailType == type);

            total = mail.Count();

            foreach (var item in mail)
            {
                switch (item.ProductType)
                {
                    case "Passport":
                        passport++;
                        break;
                    case "BDM":
                        bdm++;
                        break;
                    case "Authentication":
                        authentication++;
                        break;
                    case "Citizenship":
                        citizenship++;
                        break;
                    case "Other":
                        other++;
                        break;
                }
            }
            return Ok(new
            {
                total,
                passport,
                bdm,
                authentication,
                citizenship,
                other
            });
        }

        // GET: api/ExternalMails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExternalMail>> GetExternalMail(int id)
        {
            if (_context.ExternalMails == null)
            {
                return NotFound();
            }
            var externalMail = await _context.ExternalMails.FindAsync(id);

            if (externalMail == null)
            {
                return NotFound();
            }

            return externalMail;
        }

        // PUT: api/ExternalMails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExternalMail(int id, ExternalMail externalMail)
        {
            if (id != externalMail.ExternalMailID)
            {
                return BadRequest();
            }

            _context.Entry(externalMail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExternalMailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ExternalMails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ExternalMail>> PostExternalMail(ExternalMail externalMail)
        {
            if (_context.ExternalMails == null)
            {
                return Problem("Entity set 'MailTrackerDbContext.ExternalMails'  is null.");
            }

            _context.ExternalMails.Add(externalMail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExternalMail", new { id = externalMail.ExternalMailID }, externalMail);
        }

        // DELETE: api/ExternalMails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExternalMail(int id)
        {
            if (_context.ExternalMails == null)
            {
                return NotFound();
            }
            var externalMail = await _context.ExternalMails.FindAsync(id);
            if (externalMail == null)
            {
                return NotFound();
            }

            _context.ExternalMails.Remove(externalMail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExternalMailExists(int id)
        {
            return (_context.ExternalMails?.Any(e => e.ExternalMailID == id)).GetValueOrDefault();
        }

    }
}
