import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course = {
    courseName: "",
    description: "",
    date: ""
  }
  id;
  constructor(private _service: MainService, private _router: Router, private _route: ActivatedRoute) { }



  ngOnInit() {
    if (this._service.user == null) {
      this._router.navigate(['']);
    }
    else {
      this._route.paramMap.subscribe(params =>{
        console.log(params.get('id'));

        this._service.retrieveOne(params.get('id'), (res) => {
          this.course = res;
          this.id = params.get('id');
          console.log(this.id);
        })
      })
    }
  }

  logout() {
    this._service.logout();
    this._router.navigate(['']);
  }

  updateCourse(id) {
    this._service.updateCourse(this.id, this.course, (res) => {
      this.course = {
        courseName: "",
        description: "",
        date: ""
      }
    });
    this._router.navigate(['/create']);
    } 
  }

}
