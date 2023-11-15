import { MatchService } from './../../services/match.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { addObject, generateId, getObjectFromLocalStorage } from 'src/app/shared/genericFunction';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  scorerTeamOneForm: FormGroup;
  scorerTeamTwoForm: FormGroup;
  match: any = {};
  scorerTeamOne: any = {};
  scorerTeamTwo: any = {};
  id: any;
  commentForm:FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private matchService: MatchService,
    private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.commentForm=this.formBuilder.group({
      content:["",Validators.required]
    })
    this.id = this.activatedRoute.snapshot.paramMap.get("x");
    
    this.matchService.getMatchById(this.id).subscribe(
      (data) => {
        console.log("Here data", data.match);
        this.match = data.match;
      })
    }
  addComment(){
    let comment=this.commentForm.value;
    comment.matchId=this.id;
    let user=JSON.parse(localStorage.getItem("connectedUser")||"[]");
    comment.userId=user.id;
    this.matchService.addComment(comment).subscribe(
      (response)=>{
        console.log("here is response",response);
        
      }
    );
  }

}
