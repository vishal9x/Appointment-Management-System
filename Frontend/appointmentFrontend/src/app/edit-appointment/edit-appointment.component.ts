import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditAppointmentComponent {
  appointment = {
    Id: null,
    PatientName: '',
    StartTime: '',
    EndTime: '',
    DoctorName: ''
  };

  constructor(private router: Router, private commonService: CommonService){
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { appointment?: any };
    if (state?.appointment) {
      // Convert StartTime and EndTime to string for datetime-local input
      this.appointment = {
        ...state.appointment,
        StartTime: this.formatDateTime(state.appointment.StartTime),
        EndTime: this.formatDateTime(state.appointment.EndTime)
      };
    }
  }

  formatDateTime(date: string | Date): string {
    const d = new Date(date);
    // Format as 'YYYY-MM-DDTHH:mm' for datetime-local input
    return d.toISOString().slice(0,16);
  }

  onSubmit() {
    if (typeof this.appointment.Id === 'number' && !isNaN(this.appointment.Id)) {
      this.commonService.updateAppointment(this.appointment.Id, this.appointment).subscribe({
        next: (res) => {
          console.log('Updated:', res);
          alert('Appointment updated!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating appointment:', err);
          alert('Failed to update appointment!');
        }
      });
    } else {
      alert('Invalid appointment ID!');
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}