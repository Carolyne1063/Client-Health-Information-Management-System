import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/admin-dashboard/dashboard/dashboard.component';
import { PatientsComponent } from './components/admin-dashboard/patients/patients.component';
import { HealthProgramsComponent } from './components/admin-dashboard/health-programs/health-programs.component';
import { EnrollmentsComponent } from './components/admin-dashboard/enrollments/enrollments.component';
import { SettingsComponent } from './components/admin-dashboard/settings/settings.component';

export const routes: Routes = [
    { path: 'admin-dashboard', component: AdminDashboardComponent, 
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'events', component: PatientsComponent },
            { path: 'users', component: HealthProgramsComponent },
            { path: 'bookings', component: EnrollmentsComponent },
            { path: 'settings', component: SettingsComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' } 
        ]
    },
    { path: '**', redirectTo: 'admin-dashboard', pathMatch: 'full'}

];
