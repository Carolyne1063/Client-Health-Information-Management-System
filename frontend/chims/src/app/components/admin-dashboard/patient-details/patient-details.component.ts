import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/clientService';
import { EnrollmentService } from '../../../services/enrollmentService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent {
  patient: any;
  isEditing = false;
  showDeletePopup = false;
  
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private enrollmentService: EnrollmentService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.loadPatientData();
  }

  loadPatientData() {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.clientService.getClientById(patientId).subscribe({
        next: (data: any) => {
          this.patient = data;

          // Fetch the enrollments for this patient
          this.enrollmentService.getEnrollmentsByClientId(patientId).subscribe({
            next: (enrollments: any) => {
              this.patient.enrollments = enrollments; // Add enrollments to patient object
            },
            error: (err: any) => {
              console.error('Error fetching enrollments:', err);
            }
          });
        },
        error: (err: any) => {
          console.error('Error fetching patient details:', err);
        }
      });
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  
  openDeletePopup() {
    this.showDeletePopup = true;
  }
  
  closeDeletePopup() {
    this.showDeletePopup = false;
  }

  // Update patient details after editing
  updatePatient() {
    const patientId = this.route.snapshot.paramMap.get('id'); // Get the ID from the URL
    if (patientId) {
      // Ensure that the `patient` object has the necessary fields
      const patientData = {
        fname: this.patient.fname,
        lname: this.patient.lname,
        age: this.patient.age,
        gender: this.patient.gender,
        phone: this.patient.phone,
        email: this.patient.email
      };
  
      console.log('Sending updated patient data:', patientData); 
  
      this.clientService.updateClient(patientId, patientData).subscribe({
        next: (response) => {
          console.log('Patient updated successfully:', response);
          this.isEditing = false; 
          this.loadPatientData();
        },
        error: (err) => {
          console.error('Error updating patient:', err);
          alert('Error updating patient. Please check the details and try again.');
        }
      });
    }
  }
  
deleteClient() {
  const patientId = this.route.snapshot.paramMap.get('id'); 
  console.log('Deleting client with ID:', patientId);  

  if (patientId) {
    this.clientService.deleteClient(patientId).subscribe({
      next: (response) => {
        console.log('Client deleted successfully:', response);
        alert('Patient deleted successfully!');
        this.router.navigate(['/all-patients']); 
      },
      error: (err) => {
        console.error('Error deleting client:', err);
        alert('Error deleting patient. Please try again later.');
      }
    });
  } else {
    console.error('No ID provided for deletion');
    alert('Error: No client ID found.');
  }
}

}
