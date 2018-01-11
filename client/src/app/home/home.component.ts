import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = {
    first_name: "",
    last_name: "",
    email: ""
  };
   
  courses=[];
  course=[];
  today = new Date();
  
  constructor(private _service: MainService, private _router: Router) { }

  ngOnInit() {
    this.user = this._service.user;
    // console.log(this.user);
    if (this._service.user === null) {
      this._router.navigate(['']);
    }
    // retrieve all courses
    else {
      this._service.retrieveCourses((res) => {
        this.courses = res;
      })
    }

  }

  logout() {
    this._service.logout();
    this._router.navigate(['']);
  }

  delete(id) {
    this._service.delete(id, (res) => {
      this.courses = res;
    });
  }

}
