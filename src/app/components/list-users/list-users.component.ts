import { Router } from '@angular/router';
import { ValidationService } from './../../services/validation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  Dashboard:string="";
  users:any;
  constructor(
    private validationService:ValidationService,
    private router:Router
  ) { }

  ngOnInit() {
    this.validationService.getAllUsers().subscribe(
      (data)=>{
        console.log("here data",data.users);
        this.users=data.users;
        console.log("here users",this.users);
        
        this.Dashboard=data.users.length+"    Utilisateurs"
        
      })
  }
  goToEdit(id:any){
    this.router.navigate([`editClient/${id}`]);
  }

}
