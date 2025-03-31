import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserServiceService} from "../../../api/services/user-service.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-email-verify',
    templateUrl: './email-verify.component.html',
    styleUrls: ['./email-verify.component.scss'],
    standalone: false
})
export class EmailVerifyComponent implements OnInit{
  protected loading: boolean = true;
  protected userId?: string;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserServiceService, @Inject(MAT_DIALOG_DATA) private data: any, private router: Router) {
    if(data) {
      this.userId = data['userId'];
    }
  }
  ngOnInit(): void {
    if(this.userId) {
      this.userService.verify({body: {
          id: this.userId,
        }}).subscribe( _ => {
        this.loading = false;
      })
    }
  }
  startShopping() {
   this.router.navigateByUrl('/home');
  }
}
