import { UserService } from './../../services/user.service';
import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: any = [];
  pageOfItems: Array<any>;
  role:string;
  constructor(
    private userService: UserService,
    private matchService: MatchService) { }

  ngOnInit() {
    // this.matches = getObjectFromLocalStorage("matches");
    this.matchService.getAllMatches().subscribe(
      (data) => {
        this.matches = data.matches;
      });
    let id = localStorage.getItem("connectedUser");
    if (id) {
      this.userService.getUserById(id).subscribe(
        (data) => {
          this.role = data.user.role;
          console.log("here is the ", this.role);
        })
    }
  }
  updateMatches(x: any) {
    if (x) {
      this.matchService.getAllMatches().subscribe(
        (data) => {
          this.matches = data.matches;
        });
    }
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }


}
