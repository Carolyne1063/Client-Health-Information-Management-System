import { Component } from '@angular/core';
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
export class SettingsComponent {
  admin = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private adminService: AdminService) {}

  onSubmit() {
    this.adminService.updateAdmin(this.admin).subscribe(response => {
      console.log('Admin updated', response);
    }, error => {
      console.error('Error updating admin', error);
    });
  }
}
