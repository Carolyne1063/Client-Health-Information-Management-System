import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Program, ProgramService } from '../../../services/healthProgramService';
import { EnrollmentService } from '../../../services/enrollmentService';

interface Client {
  id: string;
  fname: string;  
  lname: string;  
  email: string; 
  startDate: string;  
}


@Component({
  selector: 'app-enrollments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.css'
})
export class EnrollmentsComponent {
  selectedProgramId: string | null = null;
  programs: Program[] = [];
  patients: any[] = [];

  constructor(
    private programService: ProgramService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.programService.getAllPrograms().subscribe((programs) => {
      this.programs = programs;
      this.programs.forEach(program => {
        this.getEnrollmentsCount(program.id);
      });
    });
  }

  getEnrollmentsCount(programId: string): void {
    this.enrollmentService.getEnrollmentsByProgramId(programId).subscribe(
      (enrollments) => {
        const program = this.programs.find(p => p.id === programId);
        if (program) {
          program.totalEnrollments = enrollments.length;
        }
      },
      (error) => {
        console.error('Error fetching enrollments:', error);
      }
    );
  }

  openPatientsPopup(programId: string): void {
    this.selectedProgramId = programId;
    this.enrollmentService.getEnrollmentsByProgramId(programId).subscribe((enrollments) => {
      this.patients = enrollments.map((enrollment) => {
        return {
          id: enrollment.client.id,
          fname: enrollment.client.fname,
          lname: enrollment.client.lname,
          email: enrollment.client.email,
          startDate: enrollment.startDate 
        };
      });
    });
  }
  

  closePopup(): void {
    this.selectedProgramId = null;
    this.patients = [];
  }
}
