import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {

  stadiumUrl: string = "http://localhost:3000/stadiums"
  constructor(private http: HttpClient) { }
  
  addStadium(obj: any) {
    return this.http.post<{message:string}>(this.stadiumUrl,obj);
  }
  
  editStadium(obj: any) {
    return this.http.put<{message:string}>(this.stadiumUrl, obj);
  }

  getAllStadiumes() {
    return this.http.get<{stadiums:any}>(this.stadiumUrl);
  }

  getStadiumById(id: any) {
    return this.http.get<{stadium:any,message:string}>(`${this.stadiumUrl}/${id}`);
  }

  deleteStadium(id: any) {
    return this.http.delete<{isDeleted:boolean}>(`${this.stadiumUrl}/${id}`);
  }
}
