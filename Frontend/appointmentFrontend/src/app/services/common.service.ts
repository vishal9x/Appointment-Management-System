import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = 'http://localhost:5000/api/Appointments';

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<any[]> {
    console.log('Fetching appointments from:', this.apiUrl);
    return this.http.get<any[]>(this.apiUrl);
  }

  addAppointment(appointment: any): Observable<any> {
    return this.http.post(this.apiUrl, appointment);
  }

  updateAppointment(id: number, updated: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updated);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}