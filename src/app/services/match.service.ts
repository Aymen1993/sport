import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  matchUrl: string = "http://localhost:3000/matches"
  constructor(private http: HttpClient) { }
  // Request:Add Match
  // Response:string
  addMatch(obj: any) {
    return this.http.post<{message:string}>(this.matchUrl, obj);
  }
  // Request:Edit Match
  // Response:string
  editMatch(obj: any) {
    return this.http.put<{message:string}>(this.matchUrl, obj);
  }
  // Request:Get all Matches
  // Response:[{},{},{},...]
  getAllMatches() {
    return this.http.get<{matches:any}>(this.matchUrl);
  }
  // Request:Get Match by Id
  // Response:{}
  getMatchById(id: any) {
    return this.http.get<{match:any,message:string}>(`${this.matchUrl}/${id}`);
  }
  // Request:Delete Match
  // Response:string
  deleteMatch(id: any) {
    return this.http.delete<{isDeleted:boolean}>(`${this.matchUrl}/${id}`);
  }
  searchByScores(match:any){
    return this.http.post<{matches:any,message:string}>(`${this.matchUrl}/search`,match);
  }
  deleteMatchesByIds(obj:any){
    return this.http.post<{message:string}>(`${this.matchUrl}/delete`,obj);
  }
  addComment(obj:any){
    return this.http.post<{message:string}>(`${this.matchUrl}/comment`,obj);
  }
  getMatchWithComment(){
    return this.http.get<{matches:any}>(`${this.matchUrl}/comments`)
  }
}
