import { TeamService } from './../../services/team.service';
import { Router } from '@angular/router';
import { deleteObject, getObjectFromLocalStorage } from 'src/app/shared/genericFunction';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
  teams: any = [];
  constructor(private router: Router,private teamService:TeamService) { }

  ngOnInit() {
    this.getAllTeams();
  }
  deleteTeam(id: number) {
    this.teamService.deleteTeam(id).subscribe(
      (response) => {
        console.log("here is the response", response);
        this.getAllTeams();
      });
  }
  goToEdit(id: number) {
    this.router.navigate([`editTeam/${id}`])
  }
  goToDisplay(id: number) {
    this.router.navigate([`teamInfo/${id}`]);

  }
  getAllTeams(){
    this.teamService.getAllTeams().subscribe(
      (data) => {
        this.teams = data.teams;
      });
  }

}
