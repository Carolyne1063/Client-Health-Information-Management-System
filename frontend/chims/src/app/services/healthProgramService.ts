import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Program {
  id: string;
  name: string;
  description: string;
  totalEnrollments?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private baseUrl = 'http://localhost:4000/api/programs'; 

  constructor(private http: HttpClient) {}

   createProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(`${this.baseUrl}`, program);
  }

  getAllPrograms(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getProgramById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

   updateProgram(id: string, program: Program): Observable<Program> {
    return this.http.put<Program>(`${this.baseUrl}/${id}`, program);
  }

  deleteProgram(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
