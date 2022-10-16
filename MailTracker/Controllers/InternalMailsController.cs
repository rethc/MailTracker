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
    public class InternalMailsController : ControllerBase
    {
        private readonly MailTrackerDbContext _context;

        public InternalMailsController(MailTrackerDbContext context)
        {
            _context = context;
        }

        // GET: api/InternalMails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InternalMail>>> GetInternalMails()
        {
            return await _context.InternalMails.ToListAsync();
        }

        // GET: api/InternalMails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InternalMail>> GetInternalMail(int id)
        {
            var internalMail = await _context.InternalMails.FindAsync(id);

            if (internalMail == null)
            {
                return NotFound();
            }

            return internalMail;
        }

        // PUT: api/InternalMails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInternalMail(int id, InternalMail internalMail)
        {
            if (id != internalMail.InternalMailID)
            {
                return BadRequest();
            }

            _context.Entry(internalMail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InternalMailExists(id))
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

        // POST: api/InternalMails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InternalMail>> PostInternalMail(InternalMail internalMail)
        {
            _context.InternalMails.Add(internalMail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInternalMail", new { id = internalMail.InternalMailID }, internalMail);
        }

        // DELETE: api/InternalMails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInternalMail(int id)
        {
            var internalMail = await _context.InternalMails.FindAsync(id);
            if (internalMail == null)
            {
                return NotFound();
            }

            _context.InternalMails.Remove(internalMail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InternalMailExists(int id)
        {
            return _context.InternalMails.Any(e => e.InternalMailID == id);
        }
    }
}
