import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserControllerService} from "../../../../api/services/user-controller.service";
import {take, tap} from "rxjs";

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.scss'],
  standalone: false
})
export class EmailVerifyComponent implements OnInit {
  protected loading: boolean = true;
  protected userToken?: string;

  constructor(private userService: UserControllerService, @Inject(MAT_DIALOG_DATA) private data: any, private router: Router) {
    if (data) {
      this.userToken = data['userToken'];
    }
  }

  ngOnInit(): void {
    if (this.userToken) {
      this.userService.validateUserEmail({token: this.userToken}).pipe(
        take(1),
        tap(() => this.loading = false)
      ).subscribe()
    }
  }

  startShopping() {
    this.router.navigateByUrl('/home');
  }
}
