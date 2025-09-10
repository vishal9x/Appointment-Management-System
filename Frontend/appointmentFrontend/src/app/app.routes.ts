import { Routes } from '@angular/router';
import { AppointmentListComponent } from './appointmentList/appointment-list.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';

export const routes: Routes = [
  {
    path: '',
    component: AppointmentListComponent // Default route
  },
  {
    path: 'book-appointment',
    component: BookAppointmentComponent
  },
  {
    path: 'edit-appointment',
    component: EditAppointmentComponent
  }
];
