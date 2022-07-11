import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { AuthGuard } from "./layout/auth/auth-guard.service";
import { SessionStorageService } from "ngx-webstorage";
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { ScannerComponent } from './layout/scanner/scanner.component';

const routes: Routes = [

  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },

  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "scan",
    component: ScannerComponent,
  },
  {
    path: "main",
    component: DashboardComponent,
    canActivate: [AuthGuard],

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SessionStorageService, AuthGuard, LoginComponent],
})
export class AppRoutingModule { }
