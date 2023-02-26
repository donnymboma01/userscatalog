import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

import { tap, map } from 'rxjs/operators';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsers(15)
      .pipe(tap((users) => console.log(users)))
      .subscribe();
  }
}
