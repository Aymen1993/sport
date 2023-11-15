import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { getObjectFromLocalStorage } from 'src/app/shared/genericFunction';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  player: any={};
  id: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("x");
    let players = getObjectFromLocalStorage("players");
    this.player = players.find((obj: any) => { return obj.id == this.id });
  }

}
