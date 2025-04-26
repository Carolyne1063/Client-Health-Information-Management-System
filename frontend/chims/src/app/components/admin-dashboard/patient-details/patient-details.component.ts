import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/clientService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {
  patient: any; // or your Patient model/interface

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      this.clientService.getClientById(patientId).subscribe({
        next: (data: any) => {
          this.patient = data;
        },
        error: (err: any) => {
          console.error('Error fetching patient details:', err);
        }
      });
    }
  }
  }

