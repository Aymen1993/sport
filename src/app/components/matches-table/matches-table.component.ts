import { MatchService } from './../../services/match.service';
import { deleteObject, getObjectFromLocalStorage } from 'src/app/shared/genericFunction';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
  matches: any = [];
  isDeleleted: boolean;
  selectedMatches:any=[];
  constructor(private router: Router, private matchService: MatchService) { }

  ngOnInit() {
    this.getAllMatches();
  }
  deleteMatch(id: number) {
    this.matchService.deleteMatch(id).subscribe(
      (response) => {
        console.log("here is the response", response);
        this.getAllMatches();
      });

  }
  goToEdit(id: number) {
    // alert("ID",id);
    this.router.navigate([`editMatch/${id}`]);
  }
  display(id: number) {
    this.router.navigate([`matchInfo/${id}`]);
  }
  getAllMatches() {
    this.matchService.getAllMatches().subscribe(
      (data) => {
        this.matches = data.matches;
      });
  }
  onMatchCheckboxChange(event: any, id: any) {
    
    if (event.target.checked) {
      this.selectedMatches.push({_id:id})
    } else {
      for (let i = 0; i < this.selectedMatches.length; i++) {
        if (this.selectedMatches[i]._id==id) {
          this.selectedMatches.splice(i,1);
          break;
        }
      }
      
    }
  }
  deleteSelectedMatches(){
    console.log("selected matches:",this.selectedMatches);
    this.matchService.deleteMatchesByIds(this.selectedMatches).subscribe(
      (response)=>{
        console.log("here is the response :",response);
        this.getAllMatches();
      });
  };
}
