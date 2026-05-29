using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_VSCode.Models;

namespace API_VSCode.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankIntegrationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BankIntegrationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/BankIntegrations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BankIntegration>>> GetBankIntegrations()
        {
            return await _context.BankIntegrations.ToListAsync();
        }

        // GET: api/BankIntegrations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BankIntegration>> GetBankIntegration(Guid id)
        {
            var bankIntegration = await _context.BankIntegrations.FindAsync(id);

            if (bankIntegration == null)
            {
                return NotFound();
            }

            return bankIntegration;
        }

        // PUT: api/BankIntegrations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBankIntegration(Guid id, BankIntegration bankIntegration)
        {
            if (id != bankIntegration.Id)
            {
                return BadRequest();
            }

            _context.Entry(bankIntegration).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BankIntegrationExists(id))
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

        // POST: api/BankIntegrations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BankIntegration>> PostBankIntegration(BankIntegration bankIntegration)
        {
            _context.BankIntegrations.Add(bankIntegration);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBankIntegration", new { id = bankIntegration.Id }, bankIntegration);
        }

        // DELETE: api/BankIntegrations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBankIntegration(Guid id)
        {
            var bankIntegration = await _context.BankIntegrations.FindAsync(id);
            if (bankIntegration == null)
            {
                return NotFound();
            }

            _context.BankIntegrations.Remove(bankIntegration);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BankIntegrationExists(Guid id)
        {
            return _context.BankIntegrations.Any(e => e.Id == id);
        }
    }
}
