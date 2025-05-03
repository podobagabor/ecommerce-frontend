import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDtoDetailed} from "../../../api/models/user-dto-detailed";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {Store} from "@ngrx/store";
import {selectUser} from "../../../store/app.selectors";
import {take, tap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: false
})
export class ChangePasswordComponent implements OnInit {
  protected currentUser?: UserDtoDetailed;
  protected authForm = new FormGroup({
    password: new FormControl<string>('', Validators.required),
  })
  protected isEmailSent: boolean = false;


  constructor(private store: Store, private userService: UserControllerService, private snackService: MatSnackBar) {
  }

  ngOnInit(): void {
    this.store.select(selectUser).pipe(
      take(1)
    ).subscribe(user => {
      this.currentUser = user;
    })
  }

  sendEmail() {
    this.userService.requestPasswordChange({body: this.currentUser?.email!}).pipe(take(1),
      tap(() => this.isEmailSent = true)).subscribe()
  }
}
