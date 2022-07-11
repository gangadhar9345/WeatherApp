import { NgModule } from '@angular/core';
import { AuthGuard } from './service/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import {HeaderComponent} from './components/header/header.component';
import {ProfileComponent} from './components/profile/profile.component'
import { AboutPageComponent } from './components/about-page/about-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'header', component: HeaderComponent,canActivate: [AuthGuard] },
  {path:'profile',component:ProfileComponent, canActivate: [AuthGuard] },
  {path:'about',component:AboutPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
