import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn :any;
  role:string;
  message:string="";
  constructor(private router: Router) { }

  ngOnInit() {
    let user=JSON.parse(localStorage.getItem("connectedUser"));
    if (user) {
      this.isLoggedIn = user.id;
      this.role=user.role;
      this.message=user.fName+'  '+user.lName;
    }
  }

  logout() {
    localStorage.removeItem("connectedUser");
    this.router.navigate([""]);
    this.isLoggedIn =false;
    this.role="";
    this.message="";
    
  }

}
