import { Component } from '@angular/core';
import { EnrollmentService } from '../../../services/enrollmentService';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/clientService';
import { ProgramService } from '../../../services/healthProgramService';

@Component({
  selector: 'app-enroll-patient',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './enroll-patient.component.html',
  styleUrl: './enroll-patient.component.css'
})
export class EnrollPatientComponent {
  enrollForm: FormGroup;
  clients: any[] = [];
  programs: any[] = [];
  selectedClientId: string = '';
  selectedProgramId: string = '';
  selectedStartDate: string = '';
  
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private programService: ProgramService,
    private enrollmentService: EnrollmentService
  ) {
    this.enrollForm = this.fb.group({
      clientId: ['', Validators.required],
      programId: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadClients();
    this.loadPrograms();
  }

  loadClients() {
    this.clientService.getAllClients().subscribe({
      next: (data: any[]) => {
        this.clients = data;
      },
      error: (error: any) => {
        console.error('Error fetching clients', error);
      }
    });
  }

  loadPrograms() {
    this.programService.getAllPrograms().subscribe({
      next: (data: any[]) => {
        this.programs = data;
      },
      error: (error: any) => {
        console.error('Error fetching programs', error);
      }
    });
  }

  enrollPatient() {
    // Get form values
    const { clientId, programId, startDate } = this.enrollForm.value;
  
    // Check if all fields are filled
    if (!clientId || !programId || !startDate) {
      console.error('Please fill all fields before enrolling!');
      return;
    }
  
    // Format the date to YYYY-MM-DD (short date format)
    const formattedStartDate = new Date(startDate).toISOString().split('T')[0]; // Get the short date format (YYYY-MM-DD)
  
    const enrollmentData = {
      clientId: clientId,
      programId: programId,
      startDate: formattedStartDate // Send short date to the backend
    };
  
    this.enrollmentService.enrollClient(enrollmentData).subscribe({
      next: (response: any) => {
        console.log('Enrollment successful', response);
        this.successMessage = 'Patient enrolled successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 5000); // Hide success message after 5 seconds
        this.enrollForm.reset(); // Reset the form after successful enrollment
      },
      error: (error: any) => {
        console.error('Error enrolling patient', error);
        this.errorMessage = 'Error enrolling patient. Please try again.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000); // Hide error message after 5 seconds
      }
    });
  }
}
