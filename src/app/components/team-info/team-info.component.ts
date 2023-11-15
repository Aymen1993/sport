import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { getObjectFromLocalStorage } from 'src/app/shared/genericFunction';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {
  id:any;
  team:any={};
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("x");
    let teams = getObjectFromLocalStorage("teams");
    this.team = teams.find((obj: any) => { return obj.id == this.id });
  }

}
