import { TeamService } from './../../services/team.service';
import { Router } from '@angular/router';
import { WeatherService } from './../../services/weather.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  searchForm: FormGroup;
  weather: any;
  teams:any;
  message:string="";
  path:string="";
  title:string="Search Weather";
  placeHolderTitle:string="Insert city";
  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private router:Router,
    private teamService:TeamService,
  ) { }

  ngOnInit() {
    this.path=this.router.url;
    if (this.path=="/apiTeams") {
      this.title="Search Teams";
      this.placeHolderTitle="Insert Country"
    }
    this.searchForm = this.formBuilder.group({
      city: ["", [Validators.required]],
    })

  }
  searchWeatherByCity() {

    if (this.path=="/apiTeams") {
      this.teamService.searchTeamByCountry(this.searchForm.value).subscribe(
        (response) => {
          console.log("here response", response);
          this.teams = response.teams;
        }
      )
      
    } else {
      this.weatherService.searchWeather(this.searchForm.value).subscribe(
        (data) => {
          console.log("here is response", data.weather);
          console.log("here is response", data.message);
          
          if (data.message == "1") {
            this.weather = data.weather;
            this.message="";
          }else{
            this.weather = data.weather
            this.message="NOT FOUND"
          };
  
        }
      );
    }
  }

}
