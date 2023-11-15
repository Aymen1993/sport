import { StadiumService } from './../../services/stadium.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { deleteObject, getObjectFromLocalStorage } from 'src/app/shared/genericFunction';

@Component({
  selector: 'app-stadium-table',
  templateUrl: './stadium-table.component.html',
  styleUrls: ['./stadium-table.component.css']
})
export class StadiumTableComponent implements OnInit {
  stadiums: any = [];

  constructor(
    private router: Router,
    private stadiumService: StadiumService) { }

  ngOnInit() {
    this.stadiumService.getAllStadiumes().subscribe(
      (data) => {
        this.stadiums = data.stadiums;
      });
  }
  deleteUser(id: number) {
    this.stadiumService.deleteStadium(id).subscribe(
      (response) => {
        console.log("here is the response", response);
        this.stadiumService.getAllStadiumes().subscribe(
          (data) => {
            this.stadiums = data.stadiums;
          });
      });
  }
  goToEdit(id: number) {
    this.router.navigate([`editStadium/${id}`]);
  }

}
