import {
  Component,
  OnInit
} from '@angular/core';
import { DataService } from './../services/data.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'dashboard',  // <home></home>
  providers: [],
  styleUrls: ['./dashboard.component.styl'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private isAuth: Boolean;

  constructor(public data: DataService, public auth: AuthService) {
    const context = this;
    auth.isAuth$.subscribe(auth => { context.isAuth = auth; });
  }

  public ngOnInit() {
  }
}
