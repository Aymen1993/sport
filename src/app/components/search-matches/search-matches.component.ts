import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-matches',
  templateUrl: './search-matches.component.html',
  styleUrls: ['./search-matches.component.css']
})
export class SearchMatchesComponent implements OnInit {
  searchForm:FormGroup;
  matches:any;
  constructor(
    private formBuilder:FormBuilder,
    private matchService:MatchService) { }

  ngOnInit() {
    this.searchForm=this.formBuilder.group({
      scoreOne:["", [Validators.required]],
      scoreTwo:["", [Validators.required]]
    })
  }
  searchByScore(){
    this.matchService.searchByScores(this.searchForm.value).subscribe(
      (data)=>{
        console.log("here is the response",data.matches);
        this.matches=data.matches;
    });
  }

}
