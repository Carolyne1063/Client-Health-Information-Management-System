// src/app/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:4000/admin';  // Update with your actual API URL

  constructor(private http: HttpClient) {}

  updateAdmin(admin: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${admin.id}`, admin);
  }

  loginAdmin(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
