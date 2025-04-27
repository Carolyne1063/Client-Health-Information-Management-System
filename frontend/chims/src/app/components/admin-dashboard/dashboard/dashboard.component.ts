import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/clientService';  // Assuming this is the path
import { ProgramService } from '../../../services/healthProgramService';// Assuming this is the path
import { EnrollmentService } from '../../../services/enrollmentService'; // Assuming this is the path

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalPrograms: number = 0;
  totalEnrollments: number = 0;
  

  constructor(
    private clientService: ClientService,
    private programService: ProgramService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchPrograms();
    this.fetchEnrollments();
  }

  fetchUsers() {
    this.clientService.getAllClients().subscribe((clients: any[]) => {
      this.totalUsers = clients.length;
    });
  }

  fetchPrograms() {
    this.programService.getAllPrograms().subscribe((programs: any[]) => {
      this.totalPrograms = programs.length;
    });
  }

  fetchEnrollments() {
    this.enrollmentService.getAllEnrollments().subscribe((enrollments: any[]) => {
      this.totalEnrollments = enrollments.length;
    });
  }
}
