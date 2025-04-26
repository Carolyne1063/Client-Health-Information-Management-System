import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgramService, Program } from '../../../services/healthProgramService'; // Import the ProgramService
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-health-programs',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './health-programs.component.html',
  styleUrls: ['./health-programs.component.css']
})
export class HealthProgramsComponent implements OnInit {
  isModalOpen = false;
  isEditModalOpen = false;
  programForm: FormGroup;
  programs: Program[] = []; // Store the programs
  selectedProgramId: string | null = null; // Store selected program ID for update

  constructor(
    private fb: FormBuilder,
    private programService: ProgramService, // Inject ProgramService
    private router: Router
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
    this.programForm.reset();
  }

  // Submit new program
  submitProgram() {
    if (this.programForm.valid) {
      const newProgram: Program = this.programForm.value;
      this.programService.createProgram(newProgram).subscribe(
        (response) => {
          this.programs.push(response); // Add the newly created program to the list
          this.closeModal();
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

  // Open the edit modal and populate form with selected program's details
  openEditModal(program: Program) {
    this.selectedProgramId = program.id;
    this.programForm.patchValue({
      name: program.name,
      description: program.description
    });
    this.isEditModalOpen = true;
  }

  // Close the edit modal
  closeEditModal() {
    this.isEditModalOpen = false;
    this.programForm.reset();
    this.selectedProgramId = null;
  }

  // Update an existing health program
  updateProgram() {
    if (this.selectedProgramId && this.programForm.valid) {
      const updatedProgram: Program = {
        ...this.programForm.value,
        id: this.selectedProgramId
      };
      this.programService.updateProgram(this.selectedProgramId, updatedProgram).subscribe(
        (response) => {
          const index = this.programs.findIndex((program) => program.id === this.selectedProgramId);
          if (index !== -1) {
            this.programs[index] = response; // Update the program in the list
          }
          this.closeEditModal(); // Close the modal after updating
        },
        (error) => {
          console.error('Error updating program', error);
        }
      );
    }
  }

  // Delete a health program
  deleteProgram(id: string) {
    if (confirm('Are you sure you want to delete this program?')) {
      this.programService.deleteProgram(id).subscribe(
        () => {
          this.programs = this.programs.filter((program) => program.id !== id); // Remove deleted program from the list
        },
        (error) => {
          console.error('Error deleting program', error);
        }
      );
    }
  }
}
