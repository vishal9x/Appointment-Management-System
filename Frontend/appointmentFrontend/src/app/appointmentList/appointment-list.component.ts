import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service'; // Import the service

export interface Appointment {
  Id: number;
  PatientName: string;
  StartTime: string;
  EndTime: string;
  DoctorName: string;
}

@Component({
  selector: 'appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class AppointmentListComponent {
  appointments: Appointment[] = [];

  constructor(private router: Router, private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data.map((item: any) => ({
          Id: item.id,
          PatientName: item.patientName,
          StartTime: item.startTime,
          EndTime: item.endTime,
          DoctorName: item.doctorName
        }));
        console.log('Appointments loaded:', this.appointments);
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
      }
    });
  }

  onBookAppointment() {
    this.router.navigate(['/book-appointment']);
  }

  onEdit(appt: Appointment) {
    this.router.navigate(['/edit-appointment'], { state: { appointment: appt } });
  }

  onDelete(appt: Appointment) {
    this.commonService.deleteAppointment(appt.Id).subscribe({
      next: () => {
        // Remove the deleted appointment from the local array
        this.appointments = this.appointments.filter(a => a.Id !== appt.Id);
        alert('Appointment deleted!');
        console.log('Deleted appointment:', appt);
      },
      error: (err) => {
        console.error('Error deleting appointment:', err);
      }
    });
  }
}