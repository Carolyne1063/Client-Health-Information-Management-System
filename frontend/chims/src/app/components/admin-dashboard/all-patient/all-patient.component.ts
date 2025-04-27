import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/clientService';

@Component({
  selector: 'app-all-patient',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './all-patient.component.html',
  styleUrl: './all-patient.component.css'
})
export class AllPatientComponent implements OnInit {
  patients: any[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.clientService.getAllClients().subscribe({
      next: (res: any) => {
        this.patients = res; 
      },
      error: (err: any) => {
        console.error('Failed to fetch patients', err);
      }
    });
  }
}
