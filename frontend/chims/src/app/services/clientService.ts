import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:4000/api/clients'; 

  constructor(private http: HttpClient) {}

  registerClient(clientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, clientData);
  }

  getAllClients(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getClientById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateClient(id: string, clientData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, clientData);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
