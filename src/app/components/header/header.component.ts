import { Component, HostBinding, OnInit } from '@angular/core';
// import { faHome, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppService } from 'src/app/service/app.service';
import { Subscription } from 'src/app/models/subscription';
import { NewSubscription } from 'src/app/shared/newSubscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'WeatherApp';
  cities;
  countries;
  inputCountry;
  subscription:Subscription;
  notifications: Subscription[];
  notificationObj:NewSubscription;
  deleteSubScription:NewSubscription;
  login;
  user;



  constructor(private appService: AppService,private router:Router) {
    this.subscription = new Subscription('', '', '');
    this.notificationObj = new NewSubscription('','','') 
  }

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

    this.getSubscription();
    this.getCountryData();
    // this.getCityData("United Kingdom");
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  getCityData(countryoption) {

    this.appService.getCities(countryoption).subscribe((obj: any) => {

      this.cities = obj.data;
      // console.log(this.cities)
    })

  }

  getCountryData() {

    this.appService.getCountries().subscribe((obj: any) => {

      this.countries = obj.data;
      // console.log(this.countries)
    })

  }

  getCountryOfCities(selectedvalue) {
    // console.log()
    // console.log("a"+this.abc)
    // console.log(selectedvalue)
    this.getCityData(selectedvalue);

  }


  getSubscription() {
    console.log(this.subscription)
    let username = localStorage.getItem('email')
    this.appService.getSubscrptions(username).subscribe((obj: any) => {

      this.notifications = obj.notifications;
      // console.log(this.notifications)
    })
  }

  addSubscription() {
    let username = localStorage.getItem('email')
    // this.notificationObj=this.subscription;
    this.appService.addSubscription(this.subscription, username).subscribe((obj: any) => {

      this.notifications = obj;
      window.location.reload();
      // console.log(this.notifications)
    })
  }

  deleteSubscription(city) {
    let username = localStorage.getItem('email')
    // console.log(city)
    
    this.subscription=new Subscription(city,'','');
    this.appService.deleteSubscription(this.subscription, username).subscribe((obj: any) => {

      this.notifications = obj;
      // console.log(this.notifications)
    })
  }


}
