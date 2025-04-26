import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgramService, Program } from '../../../services/healthProgramService'; // Import the ProgramService
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-health-programs',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './health-programs.component.html',
  styleUrls: ['./health-programs.component.css']
})
export class HealthProgramsComponent implements OnInit {
  isModalOpen = false;
  programForm: FormGroup;
  programs: Program[] = []; // Store the programs

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

  // Open modal for creating a program
  openModal() {
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Submit new program
  submitProgram() {
    if (this.programForm.valid) {
      const newProgram: Program = this.programForm.value;
      console.log('Program created:', newProgram);

      // Call the service to create the program
      this.programService.createProgram(newProgram).subscribe(
        (response) => {
          this.programs.push(response); // Add the newly created program to the list
          this.closeModal();
          this.programForm.reset();
        },
        (error) => {
          console.error('Error creating program', error);
        }
      );
    }
  }

  // Fetch all programs
  getAllPrograms() {
    this.programService.getAllPrograms().subscribe(
      (response) => {
        this.programs = response; // Store fetched programs in the `programs` array
      },
      (error) => {
        console.error('Error fetching programs', error);
      }
    );
  }
}
