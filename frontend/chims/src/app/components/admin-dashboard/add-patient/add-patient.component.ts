import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/clientService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {
  patientForm: FormGroup;
  successMessage: string = '';


  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  savePatient() {
    if (this.patientForm.valid) {
      const formData = {
        fname: this.patientForm.value.firstName,
        lname: this.patientForm.value.lastName,
        age: Number(this.patientForm.value.age),
        gender: this.patientForm.value.gender,
        phone: this.patientForm.value.phone,
        email: this.patientForm.value.email
      };

      this.clientService.registerClient(formData).subscribe({
        next: (res: any) => {
          this.successMessage = 'Patient registered successfully!';
          this.patientForm.reset(); // Reset the form

          // Make the success message disappear after 3 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (err: any) => {
          console.error('Error registering patient', err);
        }
      });
    }
  }


}


