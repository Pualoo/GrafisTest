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
    public class RequestsController : ControllerBase
    {
        private readonly GrafisTestContext _context;

        public RequestsController(GrafisTestContext context)
        {
            _context = context;
        }

        // GET: api/Requests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequests()
        {
            return await _context.Requests.ToListAsync();
        }

        // GET: api/Requests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(long id)
        {
            var request = await _context.Requests.FindAsync(id);

            if (request == null)
            {
                return NotFound();
            }

            return request;
        }

        // PUT: api/Requests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequest(long id, Request request)
        {
            if (id != request.IdRequest)
            {
                return BadRequest();
            }

            request.ValueRequest = CountValueProducts(request);
            request.TotalValue = request.ValueRequest - request.DiscountRequest;

            if (request.ValueRequest < 0 || request.DiscountRequest < 0 || request.TotalValue < 0)
            {
                return StatusCode(400, $"The some value of request are less than 0");
            }

            _context.Entry(request).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestExists(id))
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

        // POST: api/Requests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Request>> PostRequest(Request request)
        {
            var query = _context.Requests.OrderBy(x => x.NumberRequest);

            if (query.Count() <= 0)
            {
                request.NumberRequest = 11111;
            }
            else
            {
                request.NumberRequest = query.Last().NumberRequest + 1;
            }

            request.ValueRequest = CountValueProducts(request);
            request.TotalValue = request.ValueRequest - request.DiscountRequest;

            if (request.ValueRequest < 0 || request.DiscountRequest < 0 || request.TotalValue < 0)
            {
                return StatusCode(400, $"The some value of request are less than 0");
            }

            var requestProduct = request.RequestProducts;
            request.RequestProducts = null;
            _context.Requests.Add(request);
            await _context.SaveChangesAsync();
            request.RequestProducts = requestProduct;
            _context.Requests.Attach(request);
            _context.Requests.Add(request);
            Debug.WriteLine(requestProduct.Count);
            _context.Entry(request).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetRequest", new { id = request.IdRequest }, request);
        }

        // DELETE: api/Requests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(long id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            _context.Requests.Remove(request);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RequestExists(long id)
        {
            return _context.Requests.Any(e => e.IdRequest == id);
        }

        private float CountValueProducts(Request request)
        {
            var listProducts = request.RequestProducts.ToList();
            float result = 0;
            Product product;
            for(int i = 0; i<listProducts.Count; i++)
            {
                product = _context.Products.Where(x => x.IdProduct == listProducts[i].IdProduct).FirstOrDefault();
                result += product.ValueProduct * listProducts[i].QuantityProduct;
            }
            return result;
        }
    }
}
