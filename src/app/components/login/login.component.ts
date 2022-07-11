import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AppService } from 'src/app/service/app.service';
import { sha256 } from 'js-sha256';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  openTab: string;
  newUser: User;
  error: boolean;
  errMsg = "";
  loginUser: User;
  public authentication: boolean;
  loading = false;
  subMo = false
  public er;
  public erMsg;
  public data;
  constructor(private router: Router, private route: ActivatedRoute, private appService: AppService) {
    this.newUser = new User('', '', '','');
    this.loginUser = new User('', '', '','');
    let tmperr = this.route.snapshot.queryParamMap.get('error') || "false";
    this.error = (tmperr === "true")
    this.openTab = this.route.snapshot.queryParamMap.get('tab') || 'login';
    console.log(this.openTab)
  }

  ngOnInit(): void {
    this.authentication = false;
    localStorage.setItem('isLoggedIn', "false");
  }

  login() {
    localStorage.clear();
    if (this.loginUser.email && this.loginUser.password) {
      this.loading = true;
     
      // this.loginUser.password = sha256.hex(this.loginUser.password);
      console.log(this.loginUser)
      this.appService.login(this.loginUser).subscribe((data => {
        {
          this.subMo = false;
          this.loading = false;
          // this.loginUser=data;
         
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('email', data.username);
          localStorage.setItem('name',data.name);
          localStorage.setItem('address',data.address);
          this.router.navigate([''])
        }

      }),
        error => {
          this.authentication = true;
          this.er = error;
          this.erMsg = this.er["error"].message;
          this.loading = false;
          


        })
    }
    else {
      this.authentication = true;
      this.loading = false;
      
      this.erMsg = "Invalid Credentials"
    }


  }


}
