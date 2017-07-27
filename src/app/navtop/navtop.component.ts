import { Component } from '@angular/core';
import { DataService } from './../services/data.service';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'navtop',
  styleUrls: ['./navtop.styl'],
  templateUrl: './navtop.html'
})
export class Navtop {
  private isAuth: Boolean = false;
  constructor(public data: DataService, public auth: AuthService) {
    const context = this;
    auth.isAuth$.subscribe(a => { context.isAuth = a; });
  }
  ngOnInit() {
  }
  public logout() {
    this.auth.logout();
  }
}