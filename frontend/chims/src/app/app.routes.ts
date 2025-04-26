import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/admin-dashboard/dashboard/dashboard.component';
import { PatientsComponent } from './components/admin-dashboard/patients/patients.component';
import { HealthProgramsComponent } from './components/admin-dashboard/health-programs/health-programs.component';
import { EnrollmentsComponent } from './components/admin-dashboard/enrollments/enrollments.component';
import { SettingsComponent } from './components/admin-dashboard/settings/settings.component';
import { EnrollPatientComponent } from './components/admin-dashboard/enroll-patient/enroll-patient.component';
import { AllPatientComponent } from './components/admin-dashboard/all-patient/all-patient.component';
import { AddPatientComponent } from './components/admin-dashboard/add-patient/add-patient.component';
import { PatientDetailsComponent } from './components/admin-dashboard/patient-details/patient-details.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, 
    { path: 'admin', component: AdminDashboardComponent, 
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'patients', component: PatientsComponent },
            { path: 'enroll-patient', component: EnrollPatientComponent },
            { path: 'all-patients', component: AllPatientComponent },
            { path: 'patient-details', component: PatientDetailsComponent },
            { path: 'add-patient', component: AddPatientComponent },  
            { path: 'programs', component: HealthProgramsComponent },
            { path: 'enrollments', component: EnrollmentsComponent },
            { path: 'settings', component: SettingsComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' } 
        ]
    },
    { path: '**', redirectTo: 'admin', pathMatch: 'full'}

];
