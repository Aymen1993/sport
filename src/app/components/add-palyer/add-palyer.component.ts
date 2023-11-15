import { PlayerService } from './../../services/player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { generateId, getObjectFromLocalStorage } from 'src/app/shared/genericFunction';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-palyer',
  templateUrl: './add-palyer.component.html',
  styleUrls: ['./add-palyer.component.css']
})
export class AddPalyerComponent implements OnInit {
  player: any = {};
  playerForm: FormGroup;
  id: any;
  players: any =[];
  formTitle: string = "Add Player";
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private playerService:PlayerService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("x");
    if (this.id) {
      this.playerService.getPlayerById(this.id).subscribe(
        (data)=>{
          this.player=data.player;
        })
      this.formTitle = "Edit Player";
    }
  }
  addPlayer() {
   
    if (this.id) {
       this.playerService.editPlayer(this.player).subscribe((response)=>{console.log("here response is: ",response);
       })
    } else {
      this.playerService.addPlayer(this.player).subscribe((response)=>{console.log("here response is",response)});

    }
    this.router.navigate(["admin"]);
  }
}
