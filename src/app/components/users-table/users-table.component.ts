import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  users: any = [];
  constructor(private userService: UserService,private router:Router) { }

  ngOnInit() {
    console.log("here to get all users");
    
    this.getAllUsers();
    this.users = this.sortUserByRole(this.users);
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        console.log("here is the response", response);
        this.getAllUsers();
      });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data.users;
        this.users = this.sortUserByRole(this.users);
      })
  }
  sortUserByRole(T: any) {
    T.sort((a: any, b: any) => {
      if (a.role < b.role) {
        return -1;
      }
      if (a.role > b.role) {
        return 1;
      }
      return 0;
    });
    return T;
    // let tab = [];
    // tab.push(...T.filter((el: any) => { return el.role == "admin" }), ...T.filter((el: any) => { return el.role == "user" }));
    // return tab;
  }
  goToEdit(id:any){
    this.router.navigate([`editUser/${id}`]);
  }

  
}
