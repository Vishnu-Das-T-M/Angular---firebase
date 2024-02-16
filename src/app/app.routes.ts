import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CrudComponent } from './crud/crud.component';
import { AuthGuardService } from './authguard.guard';
import { authenticationGuard } from './auth.guard';


export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'crud', component: CrudComponent ,canActivate: [authenticationGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
