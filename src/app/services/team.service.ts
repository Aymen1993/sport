import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamUrl: string = "http://localhost:3000/teams"
  constructor(private http: HttpClient) { }

  addTeam(obj: any) {
    return this.http.post<{ message: string }>(this.teamUrl, obj);
  }

  editTeam(obj: any) {
    return this.http.put<{ message: string }>(this.teamUrl, obj);
  }

  getAllTeams() {
    return this.http.get<{ teams: any }>(this.teamUrl);
  }

  getTeamById(id: any) {
    return this.http.get<{ team: any, message: string }>(`${this.teamUrl}/${id}`);
  }

  deleteTeam(id: any) {
    return this.http.delete<{ isDeleted: boolean }>(`${this.teamUrl}/${id}`);
  }

  searchTeamByCountry(obj: any) {
    return this.http.post<{ teams: any }>(`${this.teamUrl}/country`, obj);
  }
}
