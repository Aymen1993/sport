import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = "http://localhost:3000/users"

  constructor(private http: HttpClient) { }

  signup(user: any,img:File) {
    let formData=new FormData();
    formData.append("firstName",user.firstName);
    formData.append("lastName",user.lastName);
    formData.append("email",user.email);
    formData.append("pwd",user.pwd);
    formData.append("role",user.role);
    formData.append("gender",user.gender);
    formData.append("img",img);
    return this.http.post<{ message: string, emailExist:boolean}>(`${this.userUrl}/signup`, formData);
  }

  login(user: any) {
    return this.http.post<{message :string,user:any}>(`${this.userUrl}/login`, user);
  }

  editUser(user: any) {
    return this.http.put<{ message: string }>(this.userUrl, user);
  }

  getAllUsers() {
    return this.http.get<{ users: any }>(this.userUrl);
  }

  getUserById(id: any) {
    return this.http.get<{ user: any, message: string }>(`${this.userUrl}/${id}`);
  }

  deleteUser(id: any) {
    return this.http.delete<{ isDeleted: boolean }>(`${this.userUrl}/${id}`);
  }
}
