import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  newCourse = {
    courseName: "",
    description: "",
    date: ""
  }

  constructor(private _service: MainService, private _router: Router) { }

  createCourse() {
    this._service.createCourse(this.newCourse, (res) => {
      console.log(res);
      console.log("new course data sending");
      this.newCourse = {
        courseName: "",
        description: "",
        date: ""
      }
    });
    this._router.navigate(['/create']);
  }

  ngOnInit() {
    if (this._service.user == null) {
      this._router.navigate(['']);
    }
  }
  
  logout() {
    this._service.logout();
    this._router.navigate(['']);
  }



}
