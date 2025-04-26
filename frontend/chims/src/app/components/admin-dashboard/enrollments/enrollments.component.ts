import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


// Define the Patient type to use for our array
interface Patient {
  programId: number;
  name: string;
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
 
  // Store the currently selected program ID to display patients
  selectedProgramId: number | null = null;

  // Dummy data for programs
  programs = [
    { id: 1, name: 'Weight Loss Program', description: 'A 3-month journey towards healthier living and fitness.', enrolledPatientsCount: 24 },
    { id: 2, name: 'Diabetes Management', description: 'Comprehensive education and support for diabetes care.', enrolledPatientsCount: 17 },
    { id: 3, name: 'Heart Health Program', description: 'Empowering heart-healthy lifestyles with expert guidance.', enrolledPatientsCount: 31 },
  ];

  // Dummy data for patients (to be filtered based on the program ID)
  patientsData: Patient[] = [
    { programId: 1, name: 'John Doe', email: 'john@example.com', startDate: '2025-05-01' },
    { programId: 1, name: 'Jane Smith', email: 'jane@example.com', startDate: '2025-05-03' },
    { programId: 2, name: 'Michael Johnson', email: 'michael@example.com', startDate: '2025-06-01' },
    { programId: 2, name: 'Emily Davis', email: 'emily@example.com', startDate: '2025-06-05' },
    { programId: 3, name: 'Chris Lee', email: 'chris@example.com', startDate: '2025-07-01' },
    { programId: 3, name: 'Ava Martinez', email: 'ava@example.com', startDate: '2025-07-05' },
  ];

  // Array to store patients filtered by program
  patients: Patient[] = [];

  // Method to open the patients popup and filter patients based on selected program
  openPatientsPopup(programId: number): void {
    this.selectedProgramId = programId;
    this.patients = this.patientsData.filter(patient => patient.programId === programId);
  }

  // Method to close the patients popup
  closePopup(): void {
    this.selectedProgramId = null;
    this.patients = [];
  }
}
