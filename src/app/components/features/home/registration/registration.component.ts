import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {UserControllerService} from "../../../../api/services/user-controller.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: false
})
export class RegistrationComponent implements OnInit {
  protected registrated: boolean = false;
  protected passwordsNotCorrect: boolean = false;
  protected registrationForm = new FormGroup({
    familyName: new FormControl<string>('', Validators.required),
    firstName: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    passwordFirst: new FormControl<string>('', Validators.required),
    passwordSecond: new FormControl<string>('', Validators.required),
    gender: new FormControl<'MALE' | 'FEMALE'>('MALE'),
  })

  constructor(private userService: UserControllerService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.registrationForm.controls.passwordFirst.valueChanges.subscribe(value => {
      this.passwordsNotCorrect = !!(value && this.registrationForm.value.passwordSecond && value !== this.registrationForm.value.passwordSecond);
    })
    this.registrationForm.controls.passwordSecond.valueChanges.subscribe(value => {
      this.passwordsNotCorrect = !!(value && this.registrationForm.value.passwordFirst && value !== this.registrationForm.value.passwordFirst);
    })
  }

  registration() {
    if (this.registrationForm.value.gender && this.registrationForm.value.email
      && this.registrationForm.value.passwordFirst && this.registrationForm.value.firstName
      && this.registrationForm.value.familyName && this.registrationForm.value.phoneNumber)
      this.userService.createUser({
        body: {
          gender: this.registrationForm.value.gender,
          email: this.registrationForm.value.email,
          password: this.registrationForm.value.passwordFirst,
          address: undefined,
          firstName: this.registrationForm.value.firstName,
          lastName: this.registrationForm.value.familyName,
          role: "USER",
          phone: this.registrationForm.value.phoneNumber,
        }
      }).subscribe(_ => this.registrated = true)
  }

}
