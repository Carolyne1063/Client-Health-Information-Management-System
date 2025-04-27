import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/clientService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-patient',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './all-patient.component.html',
  styleUrl: './all-patient.component.css'
})
export class AllPatientComponent implements OnInit {
  patients: any[] = [];
  searchTerm: string = ''; 


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

  get filteredPatients() {  
    return this.patients.filter(patient => 
      (patient.fname + ' ' + patient.lname).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
