import { Component, OnInit } from '@angular/core';
import { NewUser } from 'src/app/shared/newUser';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updateUser: User;
  userdata: User;
  user;
  isLoggedIn;
  login;
  usernameValue;
  passwordValue;
  addressValue;
  nameValue;
  disabled: true;
  loading:false;
  erMsg;
  er;
  pName;
  constructor(private appService: AppService, private router: Router) {
    this.updateUser = new User("", "", "", "");
    this.userdata = new User("", "", "", "");
  }

  ngOnInit(): void {
    this.getUserInformation();
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.user = localStorage.getItem('name').toUpperCase();
       this.pName= this.user
      this.login = "Logout"
      // console.log(this.user)
    }
    else {
      this.user = "USER";
      this.login = "Login"
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  getUserInformation() {
    this.usernameValue = localStorage.getItem('email');

    // this.passwordValue = "********";
    this.addressValue = localStorage.getItem('address');
    this.nameValue = localStorage.getItem('name');

  }
  updateUserInformation() {
    this.updateUser=new User(this.nameValue," ",this.passwordValue,this.addressValue)
    console.log(this.passwordValue)
    // localStorage.clear();
    this.appService.updateUserDetails(this.updateUser,this.usernameValue).subscribe((data:any) => {
      {
        
        // this.loginUser=data;
       
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('email', data.username);
        localStorage.setItem('name',data.name);
        localStorage.setItem('address',data.address);
       window.location.reload()
       
      }
     
    }),
    error => {
      // this.authentication = true;
      this.er = error;
      this.erMsg = this.er["error"].message;
      this.loading = false;
      


    }
  }
    
      

}
