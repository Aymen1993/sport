import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerUrl:string="http://localhost:3000/players"
  constructor(private http:HttpClient) { }

  addPlayer(obj: any) {
    return this.http.post<{message:string}>(this.playerUrl, obj);
  }

  editPlayer(obj: any) {
    return this.http.put<{message:string}>(this.playerUrl, obj);
  }

  getAllPlayers() {
    return this.http.get<{players:any}>(this.playerUrl);
  }

  getPlayerById(id: any) {
    return this.http.get<{player:any,message:string}>(`${this.playerUrl}/${id}`);
  }

  deletePlayer(id: any) {
    return this.http.delete<{isDeleted:boolean}>(`${this.playerUrl}/${id}`);
  }

}
