import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Response } from 'src/app/models/response.interface';
import { User } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css'],
})
export class UserdetailComponent implements OnInit {
  public response: Response;
  public mode: 'edit' | 'locked' = 'locked';
  public buttonText: 'Save Changes' | 'Edit' = 'Edit';
  public user : User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    //   this.userService
    //     .getUser(params.get('uuid')!)
    //     .pipe(
    //       tap((response) => (this.response = response)),
    //       tap((items) => console.log(items))
    //     )
    //     .subscribe();
    // });
    this.user = (<User>(this.activatedRoute.snapshot.data['resolvedResponse'].results[0]));
    console.log(this.user);
  }

  public changeMode(mode?: 'edit' | 'locked'): void {
    console.log(mode);
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : 'Edit';

    if(mode === 'edit'){
      console.log('Updated user on the backend');
    }
  }
}
