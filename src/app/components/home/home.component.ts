import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  match:any={};
  constructor( private matchService:MatchService) { }

  ngOnInit() {
    this.matchService.getAllMatches().subscribe(
      (data)=>{
        this.match=data.matches[0];
      })
  }

}
