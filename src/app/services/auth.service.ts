import { Injectable } from '@angular/core';
import { SocketService } from './../services/socket.service';
import { CanActivate } from '@angular/router';
import { DataService } from './data.service'
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
	private credentials;
	private _auth$: BehaviorSubject<any>;
	private _isAuth: boolean = false;

	constructor(private router: Router, private data: DataService, public io: SocketService) {
		this._auth$ = new BehaviorSubject(this._isAuth);
		io.socket.on('auth', data => {
			this._isAuth = data;
			this._auth$.next(this._isAuth);
			if (data)
				this.router.navigate(['/dashboard']);
		});
	}

	public canActivate() {
		console.log('AUTHGUARD', this._isAuth)
		return this._isAuth;
	}
	public login(email, password) {
		// Mock login
/*		console.log("AUTHSERVICE.login()", email, password);
		this._isAuth = true;
		this._auth$.next(this._isAuth);		
		this.router.navigate(['/dashboard']);*/
		//	
		this.io.socket.emit('auth', { email, password });
	}
	public logout() {
		// Mock logout
		this._isAuth = false;
		this._auth$.next(this._isAuth);		
		this.router.navigate(['/home']);
		//			
		this.io.socket.emit('signout');		
	}
	get isAuth$() {
		return this._auth$.asObservable();
	}
}