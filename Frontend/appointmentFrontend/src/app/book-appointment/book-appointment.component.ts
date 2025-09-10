import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service'; // Import service

@Component({
  selector: 'book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BookAppointmentComponent {
  appointment = {
    PatientName: '',
    StartTime: '',
    EndTime: '',
    DoctorName: ''
  };

  constructor(private router: Router, private commonService: CommonService) {}

  onSubmit() {
    this.commonService.addAppointment(this.appointment).subscribe({
      next: (res) => {
        console.log('Booking:', res);
        alert('Appointment booked!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error booking appointment:', err);
        alert('Failed to book appointment!');
      }
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}