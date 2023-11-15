import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  userUrl: string = "http://localhost:3000/validation"
  constructor(private http: HttpClient) { }
  inscription(user: any) {
    return this.http.post<{ message: string}>(`${this.userUrl}/inscription`, user);
  }

  connexion(user: any) {
    return this.http.post<{message :string,user:any}>(`${this.userUrl}/connexion`, user);
  }

  getAllUsers() {
    return this.http.get<{ users: any }>(this.userUrl);
  }
  editUser(user: any) {
    return this.http.put<{ message: string }>(this.userUrl, user);
  }
  getUserById(id: any) {
    return this.http.get<{ user: any, message: string }>(`${this.userUrl}/${id}`);
  }
}
