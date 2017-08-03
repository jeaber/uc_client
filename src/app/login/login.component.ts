import {
  Component,
  OnInit
} from '@angular/core';
import { NgForm, FormBuilder, Validators, FormControlName, FormControl, FormGroup } from '@angular/forms';
import { DataService } from './../services/data.service';
import { AuthService } from './../services/auth.service';
import { keyframes, trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'login',  // <home></home>
  providers: [],
  styleUrls: ['./login.component.styl'],
  templateUrl: './login.component.html',
  animations: [
    trigger('formState', [
      state('error', style({ transform: 'translateX(0)' })),
      transition('* => error', [
        animate(300, keyframes([
          style({ color: 'red', transform: 'translateX(-10%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(10%)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateX(-10%)', offset: 0.6 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
      ]),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  private authForm: FormGroup;
  private isAuth: boolean = false;
  private submitted = false;
  public state = 'active';
  private opened = false;
  private failed = false;
  constructor(private fb: FormBuilder, public data: DataService, public auth: AuthService) {
    auth.isAuth$.subscribe(auth => {
      this.isAuth = auth;

      if (!auth && this.opened) {
        this.state = 'error';
        //console.log('hea', auth, this.state)   
        this.authForm.controls['password'].setValue('');
        this.failed = true;
        setTimeout(() => {
          this.state = 'active';
        }, 1000);
      }
      this.opened = true;
    });
  }

  public ngOnInit() {
    this.authForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  public getState() {
    return this.state;
  }
  private login(event: Event) {
    event.preventDefault();
    const context = this;

    if (!this.submitted) {
      if (this.authForm.value.email.length > 0 && this.authForm.value.password.length > 0) {
        this.auth.login(this.authForm.value.email, this.authForm.value.password);
      }
    }
    this.submitted = true;
    setTimeout(function () { context.submitted = false; }, 1000);
  }
}
