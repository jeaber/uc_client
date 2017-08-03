import {
  Component,
  OnInit
} from '@angular/core';
import { DataService } from './../services/data.service';
import { AuthService } from './../services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgForm, FormBuilder, Validators, FormControlName, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dashboard',  // <home></home>
  providers: [],
  styleUrls: ['./dashboard.component.styl'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private isAuth: Boolean;
  private emailVerifyForm: FormGroup;
  private accountData;
  private fundingData;
  private emailVerified = true;
  constructor(public data: DataService, public auth: AuthService, private fb: FormBuilder) {
    const context = this;

    auth.isAuth$.subscribe(auth => { context.isAuth = auth; });
    data.account$.subscribe(data => { context.accountData = data; });
    data.funding$.subscribe(data => { context.fundingData = data; });
    data.emailVerified$.subscribe(data => { context.emailVerified = data; });
    
  }

  public ngOnInit() {
    this.emailVerifyForm = this.fb.group({
      pin: ['', Validators.required],
    });
  }
  public verifyEmail() {
    console.log('verify email dashboard', this.emailVerifyForm.value.pin)
    this.data.verifyEmail(this.emailVerifyForm.value.pin)
  }
  public resendVerifyEmail() {
    this.data.resendVerifyEmail()
  }
  public verifyBank(one, two) {
    this.data.verifyBank(one, two);
  }
}
