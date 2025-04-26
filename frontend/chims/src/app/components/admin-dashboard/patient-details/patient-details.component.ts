import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/clientService';
import { EnrollmentService } from '../../../services/enrollmentService'; // Import the enrollment service
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent {
  patient: any; // or your Patient model/interface

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private enrollmentService: EnrollmentService // Inject the EnrollmentService
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
}
