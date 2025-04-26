import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgramService } from '../../../services/healthProgramService'; // Import the ProgramService
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Define the Program interface
export interface Program {
  id: string;
  name: string;
  description: string;
  totalEnrollments?: number; // Optional property for total enrollments
}

@Component({
  selector: 'app-health-programs',
  standalone: true,
  imports: [RouterModule,FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './health-programs.component.html',
  styleUrls: ['./health-programs.component.css']
})
export class HealthProgramsComponent implements OnInit {
  isModalOpen = false;
  programForm: FormGroup;
  programs: Program[] = []; // Now properly typed

  constructor(
    private fb: FormBuilder,
    private programService: ProgramService // Inject ProgramService
  ) {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllPrograms(); // Fetch programs when the component is initialized
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  submitProgram() {
    if (this.programForm.valid) {
      console.log('Program created:', this.programForm.value);
      // Call your backend service here to save the program
      this.closeModal();
      this.programForm.reset();
    }
  }

  getAllPrograms() {
    this.programService.getAllPrograms().subscribe(
      (response: Program[]) => { // Type the response as Program[]
        this.programs = response; // Assign the fetched programs to the `programs` variable
      },
      (error) => {
        console.error('Error fetching programs', error);
      }
    );
  }
}
