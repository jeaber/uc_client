import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import {
  Input
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { NgForm, FormBuilder, Validators, FormControlName, FormControl, FormGroup } from '@angular/forms';
import { DataService } from './../services/data.service';
import { AuthService } from './../services/auth.service';

import { NgSwitchCase } from '@angular/common';
import { ValidationService } from './validationService';
import { NgClass } from '@angular/common';
@Component({
  selector: 'signup',  // <home></home>
  providers: [],
  styleUrls: ['./signup.component.styl'],
  templateUrl: './signup.component.html',
  animations: [
    trigger('formState', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 1
      })),
      transition('inactive => active', [
        style({
          transform: 'translateX(100px)',
          opacity: 0
        }),
        animate('100ms ease-in', style({
          transform: 'translateX(0px)',
          opacity: 1
        }))
      ]),
      transition('active => inactive', [
        style({
          transform: 'translateX(-100px)',
          opacity: 1
        }),
        animate('100ms ease-in', style({
          transform: 'translateX(0px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class SignupComponent implements OnInit {
  private accountForm: FormGroup;
  private contactForm: FormGroup;
  private fundingForm: FormGroup;

  private formOpened: String;

  private ageAccepted: Boolean = false;
  private tosAccepted: Boolean = false;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder, public data: DataService) {
    this.formOpened = 'accountForm';
  }

  public ngOnInit() {
    const context = this;

    this.accountForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        ValidationService.emailValidator
      ])],
      password: ['', Validators.compose([
        Validators.required,
        ValidationService.passwordValidator
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required,
        ValidationService.passwordConfirmValidator
      ])]
    });

    this.contactForm = this.fb.group({
      streetAddress: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
      city: ['', Validators.required],
      state: ['', Validators.compose([
        Validators.required,
        ValidationService.stateValidator
      ])],
      postalCode: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{5}')
      ])],

      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ])]
    });

    this.fundingForm = this.fb.group({
      accountNumber: ['', Validators.compose([
        Validators.maxLength(20)
      ])],
      routingNumber: ['', Validators.compose([
        ValidationService.bankRoutingValidator
      ])],
      accountType: ['', Validators.required]
    });
  }
  private formState(form) {
    if (form === 'account' && this.formOpened === 'accountForm') {
      return 'active';
    }
    if (form === 'contact' && this.formOpened === 'contactForm') {
      return 'active';
    }
    if (form === 'funding' && this.formOpened === 'fundingForm') {
      return 'active';
    }
    return 'inactive';
  }
  private passwordValidateNumber(value) {
    return true
  }
  private submitAccount() {
    this.formOpened = 'contactForm';
    this.data.accountForm(this.accountForm.value);
  }
  private submitContact() {
    this.formOpened = 'fundingForm';
    this.data.contactForm(this.contactForm.value);
  }
  private submitFunding() {
    this.formOpened = 'submited';
    this.data.fundingForm(this.fundingForm.value);
    this.auth.login(this.accountForm.value.email, this.accountForm.value.password);
  }
  private submitForm() {

  }
}
