import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  user;
  login;
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')==='true'){
      this.user=localStorage.getItem('name').toUpperCase();
      this.login="Logout"
      // console.log(this.user)
    }
    else{
      this.user="USER";
      this.login="Login"
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}

