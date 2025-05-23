import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  adminName='Admin';
  adminRole='Enrollment Manager';
  patientsMenuOpen = false;

  togglePatientsMenu() {
    this.patientsMenuOpen = !this.patientsMenuOpen;
  }
}
