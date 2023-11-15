import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  notFound: any = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        pwd: ["", [Validators.required]]
      })
  }
  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        if (response.message == "2") {
          localStorage.setItem("connectedUser",JSON.stringify(response.user));
          if (response.user.role == "admin") {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['']);
          }
        } else {
          this.notFound = true;
        }
      });
  }
}
