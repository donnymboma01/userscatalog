import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiURL : string = 'https://randomuser.me/api'

  constructor(private http : HttpClient) { }

  // fetch users.
  public getUsers(size: number = 10):Observable<any>{
    return this.http.get<any>(`${this.apiURL}/?results=${size}`);
  }

  // fetch one user using the user UUID.
  public getUser(uuid:number=1):Observable<any>{
    return this.http.get<any>(`${this.apiURL}/?uuid=${uuid}`);
  }
}
