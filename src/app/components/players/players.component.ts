import { PlayerService } from './../../services/player.service';
import { getObjectFromLocalStorage } from 'src/app/shared/genericFunction';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: any;
  pageOfItems: Array<any>;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.players = getObjectFromLocalStorage("players");
    this.playerService.getAllPlayers().subscribe(
      (data) => {
        this.players = data.players;
      })
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}
