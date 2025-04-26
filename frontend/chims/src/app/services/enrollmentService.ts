// src/app/services/enrollment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private baseUrl = 'http://localhost:4000/api/enrollments'; // change if your API base URL is different

  constructor(private http: HttpClient) { }

  enrollClient(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  getAllEnrollments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getEnrollmentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getEnrollmentsByClientId(clientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/client/${clientId}`);
  }

  updateEnrollment(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteEnrollment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
