import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { error } from 'selenium-webdriver';

@Injectable()
export class MainService {

  user;
  courses = [];

  constructor(private _http: Http) {
    if (localStorage.user !== undefined) {
      this.user = JSON.parse(localStorage.user);
    }
  }

  // register user
  register(data, callback) {
    this._http.post("/register", data).subscribe(
      (res) => {
        console.log("from service register: ", res.json());
        callback(res.json());
        if (res.json().success = "success") {
          this.user = res.json().user;
          localStorage.user = JSON.stringify(res.json().user);
        }
      },
      (err) => {
        console.log(err);
      })
  }

  login(data, callback) {
    this._http.post("/login", data).subscribe(
      (res) => {
        callback(res.json());
        console.log(res.json());
        this.user = res.json().user;
        console.log(this.user);
        localStorage.user = JSON.stringify(res.json().user);
      },
      (err) => {
        console.log("error from login service: ", err);
      })
  }

  logout() {
    console.log("logout service");
    localStorage.removeItem("user");
    console.log(localStorage.user);
    this.user = null;
  }

  createCourse(courses, callback) {
    console.log("create service route", courses);
    this._http.post('/courses/user/' + this.user._id, courses).subscribe(
      (res) => {
        callback(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  
  retrieveCourses(callback) {
    console.log("get all courses");
    this._http.get('/courses').subscribe(
      (res) => {
        callback(res.json());
      },
      (err) => {
        console.log(err);
      }
    )
  }

  delete(id, callback) {
    this._http.delete('/courses/' + id).subscribe(
      (res) => {
        callback(res.json());
      },
      (err) => {
        console.log(err);
      }
    )
  }

  retrieveOne(id, callback) {
    this._http.get('/course/' + id).subscribe(
      (res) => {
        callback(res.json());
      },
      (err) => {
        console.log(err);
      }
    )
  }

  updateCourse(id, course, callback) {
    this._http.put('/courses/' + id , course).subscribe(
      (res) => {
        console.log(res);
        callback(res.json());
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
