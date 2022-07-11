import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginUser } from 'src/app/shared/loginUser';
import { NewUser } from 'src/app/shared/newUser';
import { User } from 'src/app/models/user';
import { Observable, interval } from 'rxjs';
import { Subscription } from 'src/app/models/subscription';



@Injectable({
  providedIn: 'root'
})
export class AppService {

  API_URL = "http://ec2-52-12-209-114.us-west-2.compute.amazonaws.com:8080/api"
  URL = "";
  weatherUrl = "https://api.openweathermap.org/data/2.5/weather"
  forecastUrl = "https://api.openweathermap.org/data/2.5/onecall"
  apikey = "9e8770975254035e373ed7c412f0654e"
  countriesApi = "https://countriesnow.space/api/v0.1/countries/iso";
  citiesApi = "https://countriesnow.space/api/v0.1/countries/cities";
  constructor(private http: HttpClient) {

  }
  userlogin = new LoginUser();
  newUser = new NewUser("", "", "", "");
  // registration = new User("", "", "");
  updateUser = new NewUser("", "", "", "");

  public login(user: User): Observable<any> {
    // add headers
    const header = new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
    this.URL = "/login";

    this.userlogin.username = user.email;
    this.userlogin.password = user.password;
    const body = JSON.stringify(this.userlogin);
    console.log(body);
    return this.http.post(this.API_URL + this.URL, body, { 'headers': header })

  }

  public register(user: User) {
    const header = new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
    this.URL = "/register";

    this.newUser.username = user.email;
    this.newUser.password = user.password;
    this.newUser.name = user.name;
    const body = JSON.stringify(this.newUser);
    console.log(body);
    return this.http.post(this.API_URL + this.URL, body, { 'headers': header })
  }

  getWeatherInformation(lat, lang) {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lang)
      .set('units', 'metric')
      .set('appid', this.apikey)
    return this.http.get(this.weatherUrl, { params });
  }

  getWeatherInformationBycity(city: string) {
    let params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('appid', this.apikey)

    return this.http.get(this.weatherUrl, { params });
  }

  getWeatherForecast(lat, lang) {
    // "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely&&units=metric&appid=9e8770975254035e373ed7c412f0654e"
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lang)
      .set('units', 'metric')
      .set('appid', this.apikey)
      .set('exclude', 'minutely')
    return this.http.get(this.forecastUrl, { params });
  }


  getCountries() {

    return this.http.get(this.countriesApi);
  }
  getCities(country) {
    // country="India";
    const header = new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
    let obj = Object.assign({ "country": country })
    // const body =JSON.stringify(obj);
    return this.http.post(this.citiesApi, obj, { 'headers': header });

  }

  updateUserDetails(userdata: User,username) {
    // let username=localStorage.getItem("email");
    const header = new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
    let params = new HttpParams()
      .set('user', username)
    const body = userdata.toJSON();
    return this.http.put(this.API_URL + "/user", body, { 'headers': header, 'params': params })
  }

  getUserDetails(username) {
    let params = new HttpParams()
      .set('user', username)
    return this.http.put(this.API_URL + "/user", { 'params': params })
  }

  getSubscrptions(username) {
    let params = new HttpParams()
      .set('user', username)
      return this.http.get(this.API_URL + "/notify", { 'params': params })
  }

  addSubscription(subscription: Subscription,username) {
    const header = new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
    let params = new HttpParams()
      .set('user', username)
    const body = subscription.toJSON();
    return this.http.post(this.API_URL + "/notify", body, { 'headers': header, 'params': params })
  }

  updateSubscription(subscription: Subscription,username) {
    const header = new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
    let params = new HttpParams()
      .set('user',username)
    const body = subscription.toJSON();
    return this.http.put(this.API_URL + "/notify", body, { 'headers': header, 'params': params })
  }

  deleteSubscription(subscription: Subscription,username){
    const header = new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
    let params = new HttpParams()
      .set('user',username)
    const body = subscription.toJSON();
    return this.http.delete(this.API_URL + "/notify",  { 'headers': header, 'params': params,'body':body })
  }


}
