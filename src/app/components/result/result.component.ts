import { MatchService } from './../../services/match.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { deleteObject, getObjectFromLocalStorage } from 'src/app/shared/genericFunction';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() resultInput: any = {};
  @Output() newMatches: EventEmitter<any> = new EventEmitter();
  @Input() roleInput: string;
  constructor(private matchService: MatchService, private userService: UserService) { }

  ngOnInit() { }
  scoreColor(scoreOne: any, scoreTow: any) {
    let result = "";
    if (scoreOne > scoreTow) {
      result = "green";
    } else if (scoreOne < scoreTow) {
      result = "red";
    } else {
      result = "blue";
    }
    return result;
  }
  resultStyle(scoreOne: any, scoreTow: any) {
    let result = [];
    if (scoreOne > scoreTow) {
      result = ['green', 1, "win"];
    } else if (scoreOne < scoreTow) {
      result = ['orange', -1, "loss"];
    } else {
      result = ['blue', 0, "draw"];
    }
    return result;
  }
  butteurStyle(time: any) {
    let result = "orange";
    if (time > 15) {
      result = 'green';
    }
    return result;
  }

  deleteMatch(id: number) {
    this.matchService.deleteMatch(id).subscribe(
      (response) => {
        this.newMatches.emit(response.isDeleted);
      })
  }

}
