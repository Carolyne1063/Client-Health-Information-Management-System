import { Component } from '@angular/core';
import { AdminService } from '../../services/adminService';
import { Router } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };

    this.adminService.loginAdmin(credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.successMessage = 'Login successful! Redirecting...';
        this.errorMessage = '';

        localStorage.setItem('adminData', JSON.stringify(response.admin));

        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']); 
        }, 2000);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.successMessage = '';
      }
    });
  }
}
