using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppointmentApi.Data;
using AppointmentApi.Models;

namespace AppointmentApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AppointmentsController> _logger;

        public AppointmentsController(AppDbContext context, ILogger<AppointmentsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            return await _context.Appointments.OrderBy(a => a.StartTime).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appt = await _context.Appointments.FindAsync(id);
            if (appt == null) return NotFound();
            return appt;
        }

        [HttpPost]
        public async Task<ActionResult<Appointment>> CreateAppointment([FromBody] Appointment appointment)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (appointment.EndTime <= appointment.StartTime)
                return BadRequest("EndTime must be after StartTime.");

            var overlap = await _context.Appointments.AnyAsync(a =>
                a.DoctorName == appointment.DoctorName &&
                appointment.StartTime < a.EndTime &&
                appointment.EndTime > a.StartTime);

            if (overlap)
                return BadRequest("Appointment overlaps with an existing appointment for this doctor.");

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAppointment(int id, [FromBody] Appointment appointment)
        {
            if (id != appointment.Id) return BadRequest("Id mismatch.");
            if (appointment.EndTime <= appointment.StartTime)
                return BadRequest("EndTime must be after StartTime.");
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var overlap = await _context.Appointments.AnyAsync(a =>
                a.Id != id &&
                a.DoctorName == appointment.DoctorName &&
                appointment.StartTime < a.EndTime &&
                appointment.EndTime > a.StartTime);

            if (overlap)
                return BadRequest("Appointment overlaps with an existing appointment for this doctor.");

            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Appointments.AnyAsync(a => a.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appt = await _context.Appointments.FindAsync(id);
            if (appt == null) return NotFound();

            _context.Appointments.Remove(appt);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}