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
  programs: Program[] = [];
  selectedProgramId: string | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private programService: ProgramService,
    private router: Router
  ) {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllPrograms();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.programForm.reset();
  }

  submitProgram() {
    if (this.programForm.valid) {
      const newProgram: Program = this.programForm.value;
      this.programService.createProgram(newProgram).subscribe(
        (response) => {
          this.programs.push(response);
          this.closeModal();
          this.successMessage = 'Program created successfully!';
          setTimeout(() => this.successMessage = null, 5000);
        },
        (error) => {
          this.errorMessage = 'Error creating program. Please try again.';
          setTimeout(() => this.errorMessage = null, 5000);
        }
      );
    }
  }

  getAllPrograms() {
    this.programService.getAllPrograms().subscribe(
      (response) => {
        this.programs = response;
      },
      (error) => {
        console.error('Error fetching programs', error);
      }
    );
  }

  openEditModal(program: Program) {
    this.selectedProgramId = program.id;
    this.programForm.patchValue({
      name: program.name,
      description: program.description
    });
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.programForm.reset();
    this.selectedProgramId = null;
  }

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
            this.programs[index] = response;
          }
          this.closeEditModal();
          this.successMessage = 'Program updated successfully!';
          setTimeout(() => this.successMessage = null, 5000);
        },
        (error) => {
          this.errorMessage = 'Error updating program. Please try again.';
          setTimeout(() => this.errorMessage = null, 5000);
        }
      );
    }
  }

  deleteProgram(id: string) {
    if (confirm('Are you sure you want to delete this program?')) {
      this.programService.deleteProgram(id).subscribe(
        () => {
          this.programs = this.programs.filter((program) => program.id !== id);
          this.successMessage = 'Program deleted successfully!';
          setTimeout(() => this.successMessage = null, 5000);
        },
        (error) => {
          this.errorMessage = 'Error deleting program. Please try again.';
          setTimeout(() => this.errorMessage = null, 5000);
        }
      );
    }
  }}

