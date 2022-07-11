
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { MouseEvent } from '@agm/core';
import * as moment from 'moment';
// import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
// import{images} from 




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lat;
  long;
  weather;
  displayWeather: boolean;
  currentTime = new Date();
  sunrise;
  sunset;
  forecastWeather;
  hourlyData: any[];
  dailyForecast: any[];
  stamp: number;
  date;
  currentDay;
  currentHour;
  user;
  isLoggedIn;
  login;
  obj;
  image: string;


  constructor(private router: Router, private route: ActivatedRoute, private appService: AppService) {

  }

  ngOnInit() {
    this.getLocationInformation();
    // 
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.user = localStorage.getItem('name').toUpperCase();
      this.login = "Logout"
      console.log(this.user)
    }
    else {
      this.user = "USER";
      this.login = "Login"
    }


    this.getForecastdata(this.weather.coord.lat, this.weather.coord.lon);
  }
  onSubmit(form: NgForm) {

    this.router.navigate(['search', form.value.search]);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  getLocationInformation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((data) => {
        this.lat = data.coords.latitude;
        this.long = data.coords.longitude;
        this.getForecastdata(this.lat, this.long);
        this.appService.getWeatherInformation(this.lat, this.long).subscribe(data => {
          this.weather = data;

        });
      })

    }
  }


  getCity(city) {

    this.appService.getWeatherInformationBycity(city).subscribe((data: any) => {
      
      this.weather = data;
      this.lat = data.coord.lat;
      this.long = data.coord.lon;
      this.sunrise = moment.utc(data.sys.sunrise, 'X').add(data.timezone, 'seconds').format('hh:mm a');
      this.sunset = moment.utc(data.sys.sunset, 'X').add(data.timezone, 'seconds').format('hh:mm a');

      this.getForecastdata(this.lat, this.long);
     
      // console.log(this.forecastWeather)
    })
    // this.getForecastdata(this.weather.coord.lat,this.weather.coord.lon);

  }

  // getCoordinates($event: MouseEvent) {

  //   this.lat = $event.coords.lat;
  //   this.long = $event.coords.lng;

  //   this.appService.getWeatherInformation(this.lat, this.long).subscribe((data: any) => {
  //     this.weather = data;
  //     this.sunrise = moment.utc(data.sys.sunrise, 'X').add(data.timezone, 'seconds').format('HH:mm a');
  //     this.sunset = moment.utc(data.sys.sunset, 'X').add(data.timezone, 'seconds').format('HH:mm a');
  //   })
  // }
  getForecastdata(lat, lang) {

    this.appService.getWeatherForecast(lat, lang).subscribe((data: any) => {
      this.forecastWeather = data;
      let obj = data.hourly;

     
      obj.forEach(element => {
        element.dt = moment.utc(element.dt, 'X').add(this.weather.timezone, 'seconds').format('hh:mm A ');
      });
      this.hourlyData = data.hourly;
      let sun=data.daily;
      sun.forEach(element => {
        element.sunrise = moment.utc(element.sunrise, 'X').add(this.weather.timezone, 'seconds').format('hh:mm ');
        element.sunset = moment.utc(element.sunset, 'X').add(this.weather.timezone, 'seconds').format('hh:mm ');
      });
      this.dailyForecast = sun;
      // if(data.daily.)

    })
  }
  getTime(dt, zone) {
    this.currentHour = moment.utc(dt, 'X').add(zone, 'seconds').format('HH:mm a');
  }
  images = [2, 3, 5].map((n) => `src="../../../assets/images/${n}.jpeg"`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }



}
