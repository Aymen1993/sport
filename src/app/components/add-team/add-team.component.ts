import { TeamService } from './../../services/team.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { generateId, getObjectFromLocalStorage } from 'src/app/shared/genericFunction';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  team: any = {};
  teamForm: FormGroup;
  id: any;
  formTitle: string = "Add Team";
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("x");
    if (this.id) {
      this.teamService.getTeamById(this.id).subscribe(
        (data) => {
          this.team=data.team;
        })
      this.formTitle = "Edit Team";
    }
  }
  addTeam() {
    if (this.id) {
      this.teamService.editTeam(this.team).subscribe(
        (response)=>{
          console.log("here is the response",response);
          
      });
    } else {
      this.teamService.addTeam(this.team).subscribe((response) => {
        console.log("hereresponse is", response);
      });
    }
    this.router.navigate(["admin"]);
  }
}
