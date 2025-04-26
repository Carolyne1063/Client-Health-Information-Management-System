// src/app/services/enrollmentService.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:4000/api/enrollments'; // adjust if your backend URL differs

  constructor(private http: HttpClient) {}

  getEnrollmentsByClientId(clientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/client/${clientId}`);
  }
}
