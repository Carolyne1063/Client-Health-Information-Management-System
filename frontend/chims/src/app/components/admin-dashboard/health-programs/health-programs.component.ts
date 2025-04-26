import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-health-programs',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './health-programs.component.html',
  styleUrl: './health-programs.component.css'
})
export class HealthProgramsComponent {
  isModalOpen = false;
  programForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
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
      // You can now call your backend service here to save the program
      this.closeModal();
      this.programForm.reset();
    }
  }
}
