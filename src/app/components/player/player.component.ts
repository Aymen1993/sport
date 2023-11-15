import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() playerInput: any;
  constructor() { }

  ngOnInit() {
  }
  positionColor(position: string) {
    let color: string;
    switch (position) {
      case 'ATK':
        color = "red";
        break;
      case 'MID':
        color = "blue";
        break;
      case 'DEF':
        color = "yellow";
        break;
      case 'GK':
        color = "green";
        break;
      default:
        color = "white";
    }
    return color;
  }

}
