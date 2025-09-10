using Microsoft.EntityFrameworkCore;
using AppointmentApi.Models;

namespace AppointmentApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Appointment> Appointments { get; set; }
    }
}