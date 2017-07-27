import {
  Component,
  OnInit
} from '@angular/core';
import { NgForm, FormBuilder, Validators, FormControlName, FormControl, FormGroup } from '@angular/forms';
import { DataService } from './../services/data.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'login',  // <home></home>
  providers: [],
  styleUrls: ['./login.component.styl'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private authForm: FormGroup;
  private isAuth: boolean = false;
  private submitted = false;
  constructor(private fb: FormBuilder, public data: DataService, public auth: AuthService) {
    auth.isAuth$.subscribe(auth => { this.isAuth = auth; });
  }

  public ngOnInit() {
    this.authForm = this.fb.group({
      email: [''],
      password: ['']
    });
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
