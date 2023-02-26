import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

import { tap, map } from 'rxjs/operators';
import { Response } from 'src/app/models/response.interface';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public response: Response;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsers(15)
      .pipe(
        tap((users) => console.log(users)),
        tap((items) => (this.response = items))
      )
      .subscribe();
  }
}
