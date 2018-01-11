import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

declare var $: any;
declare var jquery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user_reg = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  }

  pass_confir;

  user_login = {
    email: "",
    password: ""
  }

  err_message = {
    email: "",
    password: ""
  }

  constructor(private _service: MainService, private _router: Router) { }

  register() {
    console.log("from com register: ", this.user_reg);
    this._service.register(this.user_reg, (res) => {
      if (res.success === "success") {
        this._router.navigate(['/create']);
      }
      else {
        this.err_message.email = "This email has been registered."
      }
      this.user_reg = {
          first_name: "",
          last_name: "",
          email: "",
          password: ""
        };
      this.pass_confir = "";
    });
  }

  login(){
    this._service.login(this.user_login, (res)=>{
        if(res.message == "success"){
          console.log("ts login");
          this._router.navigate(['/create']);
          this.err_message.email = null;          
        }else{
          this.err_message.email = res.message;
        }
    })
    this.user_login = {
      email: "",
      password: ""
    };
  }

  ngOnInit() {
     // jquery for the login form
     $(function() {
      $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });
      $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });
    });
  }

}
