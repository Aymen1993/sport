import { PlayerService } from './../../services/player.service';
import { deleteObject, getObjectFromLocalStorage } from 'src/app/shared/genericFunction';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
  players: any = [];
  constructor(
    private router: Router,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.getAllPlayers();
  }
  deletePlayer(id: number) {
    this.playerService.deletePlayer(id).subscribe(
      (response) => {
        console.log("here is the response", response);
        this.getAllPlayers();
      });
  }
  goToEdit(id: number) {
    this.router.navigate([`editPlayer/${id}`]);
  }
  goToDisplay(id: number) {
    this.router.navigate([`playerInfo/${id}`]);
  }
  
  getAllPlayers() {
    this.playerService.getAllPlayers().subscribe(
      (data) => {
        this.players = data.players;
      }
    )
  }
}
