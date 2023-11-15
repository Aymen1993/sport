import { TeamService } from './../../services/team.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-teams',
  templateUrl: './api-teams.component.html',
  styleUrls: ['./api-teams.component.css']
})
export class ApiTeamsComponent implements OnInit {
  countryForm: FormGroup;
  teams: any;
  pageOfItems: Array<any>;
  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
  ) { }

  ngOnInit() {
    this.countryForm = this.formBuilder.group({
      country: ["", [Validators.required]]
    })
  }
  searchteamByCountry() {
    console.log("here is country", this.countryForm.value);

    this.teamService.searchTeamByCountry(this.countryForm.value).subscribe(
      (response) => {
        console.log("here response", response);
        this.teams = response.teams;
      }
    )
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
