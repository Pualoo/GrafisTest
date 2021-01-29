using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Context;
using BackEnd.Models;
using System.Diagnostics;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestProductsController : ControllerBase
    {
        private readonly GrafisTestContext _context;

        public RequestProductsController(GrafisTestContext context)
        {
            _context = context;
        }

        // GET: api/RequestProducts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RequestProduct>>> GetRequestProducts()
        {
            return await _context.RequestProducts.ToListAsync();
        }

        // GET: api/RequestProducts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RequestProduct>> GetRequestProduct(long id)
        {
            var requestProduct = await _context.RequestProducts.FindAsync(id);

            if (requestProduct == null)
            {
                return NotFound();
            }

            return requestProduct;
        }

        // PUT: api/RequestProducts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequestProduct(long id, RequestProduct requestProduct)
        {
            if (id != requestProduct.IdProduct)
            {
                return BadRequest();
            }

            _context.Entry(requestProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestProductExists(id))
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

        // POST: api/RequestProducts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RequestProduct>> PostRequestProduct(RequestProduct requestProduct)
        {
            Debug.WriteLine(requestProduct.IdProduct);
            Debug.WriteLine(requestProduct.IdRequest);
            _context.RequestProducts.Add(requestProduct);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RequestProductExists(requestProduct.IdProduct))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRequestProduct", new { id = requestProduct.IdProduct }, requestProduct);
        }

        // DELETE: api/RequestProducts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequestProduct(long id)
        {
            var requestProduct = await _context.RequestProducts.FindAsync(id);
            if (requestProduct == null)
            {
                return NotFound();
            }

            _context.RequestProducts.Remove(requestProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RequestProductExists(long id)
        {
            return _context.RequestProducts.Any(e => e.IdProduct == id);
        }
    }
}
