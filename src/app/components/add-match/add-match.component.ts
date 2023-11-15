import { MatchService } from './../../services/match.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getObjectFromLocalStorage } from 'src/app/shared/genericFunction';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
  // Form Id
  matchForm: FormGroup;
  // Define Object
  match: any = {};
  // ID
  id: any;
  matches: any = [];
  formTitle: string = "Add Match";
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matchService: MatchService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("x");
    if (this.id) {
      this.matchService.getMatchById(this.id).subscribe((data) => {
        this.match = data.match;
      })
      this.formTitle = "Edit Match";
    }
  }
  // methode(ngSubmit)
  validate() {

    if (this.id) {
      // Edit Match
      this.matchService.editMatch(this.match).subscribe(
        (response) => {
          console.log("here is the response", response);
          this.router.navigate(["admin"]);
        });
    } else {
      // Add Match
      this.matchService.addMatch(this.match).subscribe((response) => {
        console.log("here reponse is ", response);
        this.match={};
      })
    }
    // this.router.navigate(["admin"]);


  }
}
