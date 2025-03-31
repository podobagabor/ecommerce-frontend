import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserResponse} from "../../../api/models/user-response";
import {UserServiceService} from "../../../api/services/user-service.service";
import {AddressRequest} from "../../../api/models/address-request";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss'],
    standalone: false
})
export class UserSettingsComponent implements OnInit {

  protected currentUser?: UserResponse;
  protected billingAddressIsTheSame: boolean = false;
  protected emailChanged: boolean = false;
  protected hasBillingAddress: boolean = false;
  protected userShippingAddressForm = new FormGroup({
    country: new FormControl<string>('', Validators.required),
    zipCode: new FormControl<number | undefined>(undefined, Validators.required),
    city: new FormControl<string>('', Validators.required),
    street: new FormControl<string>('', Validators.required),
    streetNumber: new FormControl<number | undefined>(undefined, Validators.required),
    floor: new FormControl<string>(''),
  })

  protected userBillingAddressForm = new FormGroup({
    itsTheSame: new FormControl<boolean>(false),
    country: new FormControl<string>('', Validators.required),
    zipCode: new FormControl<number | undefined>(undefined, Validators.required),
    city: new FormControl<string>('', Validators.required),
    street: new FormControl<string>('', Validators.required),
    streetNumber: new FormControl<number | undefined>(undefined, Validators.required),
    floor: new FormControl<string>(''),
  })

  protected userSettingsForm = new FormGroup({
    familyName: new FormControl<string>('', Validators.required),
    firstName: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    gender: new FormControl<'MALE' | 'FEMALE'>('MALE'),
  })

  constructor(private userService: UserServiceService, private snackService: MatSnackBar, private dialog: MatDialog, private router: Router, private cookieService: CookieService, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.userBillingAddressForm.controls.itsTheSame.valueChanges.subscribe(value => {
      this.billingAddressIsTheSame = value!
    })
  }

  newPassword() {
    const ref = this.dialog.open(ChangePasswordComponent);
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(value => {
      this.currentUser = value;
      if (value) {
        this.userSettingsForm.patchValue({
          email: value.email,
          gender: value.gender,
          phoneNumber: value.phoneNumber,
          familyName: value.lastname,
          firstName: value.firstname,
        })
        if (value.shippingAddress) {
          this.userShippingAddressForm.patchValue({
            city: value.shippingAddress.city,
            floor: value.shippingAddress.floorNumber,
            street: value.shippingAddress.street,
            zipCode: value.shippingAddress.zipCode,
            streetNumber: value.shippingAddress.streetNumber,
            country: value.shippingAddress.country,
          });
        }
        if (value.billingAddress) {
          this.hasBillingAddress = true;
          this.userBillingAddressForm.patchValue({
            city: value.billingAddress.city,
            floor: value.billingAddress.floorNumber,
            street: value.billingAddress.street,
            zipCode: value.billingAddress.zipCode,
            streetNumber: value.billingAddress.streetNumber,
            country: value.billingAddress.country,
          });
        }
      }
    })
  }

  save() {
    let shippingAddress: AddressRequest | undefined = undefined;
    let billingAddress: AddressRequest | undefined = undefined;
    if (this.userShippingAddressForm.valid) {
      shippingAddress = {
        country: this.userShippingAddressForm.value.country!,
        city: this.userShippingAddressForm.value.city!,
        streetNumber: this.userShippingAddressForm.value.streetNumber!,
        zipCode: this.userShippingAddressForm.value.zipCode!,
        floorNumber: this.userShippingAddressForm.value.floor ?? '',
        street: this.userShippingAddressForm.value.street ?? '',
      }
    }
    if (!this.billingAddressIsTheSame && this.userBillingAddressForm.valid) {
      billingAddress = {
        country: this.userBillingAddressForm.value.country!,
        city: this.userBillingAddressForm.value.city!,
        streetNumber: this.userBillingAddressForm.value.streetNumber!,
        zipCode: this.userBillingAddressForm.value.zipCode!,
        floorNumber: this.userBillingAddressForm.value.floor ?? '',
        street: this.userBillingAddressForm.value.street ?? '',
      }
    } else if (this.userShippingAddressForm.valid && this.billingAddressIsTheSame) {
      billingAddress = shippingAddress;
    }
    if (this.currentUser?.email !== this.userSettingsForm.value.email) {
      this.emailChanged = true;
    }
    this.userService.updateUser({
      body: {
        billingAddress: billingAddress,
        gender: this.userSettingsForm.value.gender!,
        shippingAddress: shippingAddress,
        email: this.userSettingsForm.value.email!,
        phoneNumber: this.userSettingsForm.value.phoneNumber!,
        lastname: this.userSettingsForm.value.familyName!,
        firstname: this.userSettingsForm.value.firstName!
      }
    }).subscribe(value => {
      if (value) {
        if (this.emailChanged) {
          this.authenticationService.logout();
          this.snackService.open("Sikeres adatmódosítás. Az e-mail változás miatt jelentkezz be újra!", undefined, {
            duration: 3000
          })
        } else {
          this.snackService.open("Sikeres adatmódosítás.", undefined, {
            duration: 3000
          })
        }
      }
    })
  }
}
