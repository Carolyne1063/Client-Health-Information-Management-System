import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/adminService';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  admin = {
    id: '',   
    name: '',
    email: '',
    password: ''
  };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    // Fetch admin details from localStorage
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      const admin = JSON.parse(adminData);
      this.admin.id = admin.id;  // Set admin ID from localStorage
      this.admin.name = admin.name;
      this.admin.email = admin.email;
    }
  }

  onSubmit() {
    this.adminService.updateAdmin(this.admin).subscribe(response => {
      console.log('Admin updated', response);
      alert('Admin details updated successfully!');

      localStorage.setItem('adminData', JSON.stringify(response));
    }, error => {
      console.error('Error updating admin', error);
      alert('Error updating admin details. Please try again.');
    });
  }
}
