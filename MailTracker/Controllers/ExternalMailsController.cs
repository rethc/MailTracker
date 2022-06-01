#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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

        // GET: api/ExternalMails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExternalMail>>> GetExternalMails()
        {
            return await _context.ExternalMails.ToListAsync();
        }

        // GET: api/ExternalMails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExternalMail>> GetExternalMail(int id)
        {
            var externalMail = await _context.ExternalMails.FindAsync(id);

            if (externalMail == null)
            {
                return NotFound();
            }

            return externalMail;
        }

        /*GET: api/ExternalMails/<search>
        [HttpGet("{search}")]
        public async Task<ActionResult<IEnumerable<ExternalMail>>> GetTrackingNumber(string search)
        {
            try
            {
                var result = await _context.GetTrackingNumber(search);

                if (result.Any())
                {
                    return Ok(result);
                }

                return NotFound();

            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ),);

            }
         }*/

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
            _context.ExternalMails.Add(externalMail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExternalMail", new { id = externalMail.ExternalMailID }, externalMail);
        }

        // DELETE: api/ExternalMails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExternalMail(int id)
        {
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
            return _context.ExternalMails.Any(e => e.ExternalMailID == id);
        }

    }
}
