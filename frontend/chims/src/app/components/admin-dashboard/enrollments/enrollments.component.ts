import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Program, ProgramService } from '../../../services/healthProgramService';
import { EnrollmentService } from '../../../services/enrollmentService';


// Define the Patient type to use for our array
interface Client {
  id: string;
  fname: string;  // First name
  lname: string;  // Last name
  email: string;  // Email address
  startDate: string;  // Start date of the program (this will come from the Enrollment model)
}


@Component({
  selector: 'app-enrollments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.css'
})
export class EnrollmentsComponent {
  // Store the currently selected program ID to display patients
  selectedProgramId: string | null = null;

  // Program list to be fetched from the backend
  programs: Program[] = [];

  // Array to store patients filtered by program
  patients: any[] = [];

  constructor(
    private programService: ProgramService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    // Fetch all programs from the backend
    this.programService.getAllPrograms().subscribe((programs) => {
      this.programs = programs;
      this.programs.forEach(program => {
        this.getEnrollmentsCount(program.id);
      });
    });
  }

  // Get enrollments count for each program
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
      // Map the enrollments to the appropriate client data
      this.patients = enrollments.map((enrollment) => {
        return {
          id: enrollment.client.id,
          fname: enrollment.client.fname,
          lname: enrollment.client.lname,
          email: enrollment.client.email,
          startDate: enrollment.startDate // Assuming startDate is directly available from the enrollment
        };
      });
    });
  }
  

  // Method to close the patients popup
  closePopup(): void {
    this.selectedProgramId = null;
    this.patients = [];
  }
}
