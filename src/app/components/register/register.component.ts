import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AppService } from 'src/app/service/app.service';
import { sha256 } from 'js-sha256';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: User;
  error: boolean;
  errMsg = "";
  public er;
  public erMsg;
  public data;
  isEr=false;
  loading=false;
  isDone=false;
  showRegistration: boolean = true;
  userAlreadyRegistered: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private appService: AppService) {
    this.newUser = new User('', '', '','');
    
  }

  ngOnInit(): void {
  }
  register(signUpForm : NgForm) {
    localStorage.clear();
   
    this.loading=true;
    // this.newUser.password = sha256.hex(this.newUser.password);
    this.appService.register(this.newUser).subscribe((data => {
      {
        // localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('email', this.newUser.email)
        this.loading=false;
        this.isDone=true;
        this.clear();
       signUpForm.reset();
        this.router.navigate(['/login'])
      }
    }),
      error => {
        this.error = true
        this.errMsg = error.errMsg;
      }
    );
  }

  clear()
  {
          
          this.isEr=false;
          this.userAlreadyRegistered=false;   
         
  }
  
  showRegistrationPage()
  {
    this.loading = true;
    this.showRegistration=true;
    this.loading = false;
  }
}
