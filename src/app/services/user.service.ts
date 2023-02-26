import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Response } from '../models/response.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiURL: string = 'https://randomuser.me/api';

  constructor(private http: HttpClient) {}

  // fetch users.
  public getUsers(size: number = 10): Observable<any> {
    return this.http
      .get<any>(`${this.apiURL}/?results=${size}`)
      .pipe(map((response) => this.processResponse(response)));
  }

  // fetch one user using the user UUID.
  public getUser(uuid: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/?uuid=${uuid}`);
  }

  //-------------------------------Methodes privée -----------------------

  // cette méthode permet de mapper les valeurs de mon interface User à celles de la reponse de l'API.
  // L'objectif est d'avoir une réponse qui correspond à notre interface sans plus.
  private processResponse(response: Response): Response {
    return {
      info: {
        ...response.info,
      },
      results: response.results.map(
        (user: any) =>
          <User>{
            uuid: user.login.uuid,
            firstname: user.name.first,
            lastname: user.name.last,
            email: user.email,
            username: user.login.username,
            gender: user.gender,
            address: `${user.location.street.number}  ${user.location.street.name}`,
            dateOfBirth: user.dob.date,
            phone: user.phone,
            imageUrl: user.picture.medium,
            coordinate: {
              latitude: +user.location.coordinates.latitude,
              longitude: +user.location.coordinates.longitude,
            },
          }
      ),
    };
  }
}
