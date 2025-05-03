import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {UserDtoDetailed} from "../../../api/models/user-dto-detailed";
import {Store} from "@ngrx/store";
import {selectUser} from "../../../store/app.selectors";
import {Address} from "../../../api/models/address";
import {UserActions} from "../../../store/user-state/user.actions";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  standalone: false
})
export class UserSettingsComponent implements OnInit {

  protected currentUser?: UserDtoDetailed;
  protected emailChanged: boolean = false;
  protected userShippingAddressForm = new FormGroup({
    country: new FormControl<string>('', Validators.required),
    zipCode: new FormControl<string | undefined>(undefined, Validators.required),
    city: new FormControl<string>('', Validators.required),
    street: new FormControl<string>('', Validators.required),
    streetNumber: new FormControl<string | undefined>(undefined, Validators.required),
    floor: new FormControl<string>(''),
  })

  protected userSettingsForm = new FormGroup({
    familyName: new FormControl<string>('', Validators.required),
    firstName: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    gender: new FormControl<'MALE' | 'FEMALE'>('MALE'),
  })

  constructor(private store: Store, private userService: UserControllerService, private snackService: MatSnackBar, private dialog: MatDialog, private router: Router, private cookieService: CookieService, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.store.select(selectUser).subscribe(user => {
      this.currentUser = user;
      this.setValues();
    })
  }

  newPassword() {
    const ref = this.dialog.open(ChangePasswordComponent);
  }

  setValues() {
    this.userSettingsForm.patchValue({
      email: this.currentUser?.email || '',
      gender: this.currentUser?.gender || "MALE",
      phoneNumber: this.currentUser?.phone || '',
      familyName: this.currentUser?.lastName || '',
      firstName: this.currentUser?.firsName || '',
    })
    if (this.currentUser?.address) {
      this.userShippingAddressForm.patchValue({
        city: this.currentUser.address.city || '',
        street: this.currentUser.address.street || '',
        zipCode: this.currentUser.address.postalCode || '',
        streetNumber: this.currentUser.address.number || '',
        country: this.currentUser.address.country || '',
      });
    }
  }

  save() {
    let address: Address | undefined = undefined;
    if (this.userShippingAddressForm.valid && this.userShippingAddressForm.value.city
      && this.userShippingAddressForm.value.country && this.userShippingAddressForm.value.streetNumber
      && this.userShippingAddressForm.value.zipCode && this.userShippingAddressForm.value.street) {
      address = {
        country: this.userShippingAddressForm.value.country,
        city: this.userShippingAddressForm.value.city,
        number: this.userShippingAddressForm.value.streetNumber,
        postalCode: this.userShippingAddressForm.value.zipCode,
        street: this.userShippingAddressForm.value.street,
      }
      if (this.currentUser?.email !== this.userSettingsForm.value.email) {
        this.emailChanged = true;
      }
      this.userService.modifyUser({
        body: {
          gender: this.userSettingsForm.value.gender || "MALE",
          address: address,
          email: this.userSettingsForm.value.email || "",
          phone: this.userSettingsForm.value.phoneNumber || "",
          lastName: this.userSettingsForm.value.familyName || "",
          firstName: this.userSettingsForm.value.firstName || "",
        }
      }).subscribe(value => {
        if (value) {
          if (this.emailChanged) {
            this.authenticationService.logout();
            this.snackService.open("Sikeres adatmódosítás. Az e-mail változás miatt jelentkezz be újra!", undefined, {
              duration: 3000
            })
          } else {
            this.store.dispatch(UserActions.modified({user: value}))
            this.snackService.open("Sikeres adatmódosítás.", undefined, {
              duration: 3000
            })
          }
        }
      })
    }
  }
}
