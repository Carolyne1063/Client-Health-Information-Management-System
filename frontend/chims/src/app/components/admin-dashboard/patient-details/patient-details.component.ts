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
    private router: Router // Inject Router for navigation
  ) { }

  ngOnInit(): void {
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
  
  // Navigate to edit client form (Assuming you have a route like 'client/edit/:id')
  editClient() {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.router.navigate(['/client/edit', patientId]); // Replace with your route to edit client
    }
  }

  // Update patient details after editing
  updatePatient() {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      console.log('Sending updated patient data:', this.patient); // Log the data being sent
      this.clientService.updateClient(patientId, this.patient).subscribe({
        next: (response) => {
          console.log('Patient updated successfully:', response);
          this.isEditing = false; // Exit edit mode
        },
        error: (err) => {
          console.error('Error updating patient:', err);
        }
      });
    }
  }
  

  // Confirm before deleting the client
  confirmDelete() {
    const confirmDeletion = confirm('Are you sure you want to delete this patient?');
    if (confirmDeletion) {
      this.deleteClient();
    }
  }
  deleteClient() {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.clientService.deleteClient(patientId).subscribe({
        next: (response) => {
          console.log('Client deleted successfully:', response);
          // Show success message
          alert('Patient deleted successfully!');
          // After successful deletion, navigate back to the patients list
          this.router.navigate(['/all-patients']); // Adjust this route as necessary
        },
        error: (err) => {
          console.error('Error deleting client:', err);
        }
      });
    }
  }
  
}
