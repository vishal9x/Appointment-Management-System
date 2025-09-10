using System.ComponentModel.DataAnnotations;

namespace AppointmentApi.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required]
        public string PatientName { get; set; } = string.Empty;

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        [Required]
        public string DoctorName { get; set; } = string.Empty;
    }
}