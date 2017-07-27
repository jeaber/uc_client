import { Injectable } from '@angular/core';

@Injectable()
export class SocketService {
	public _socket: any;
	constructor() {
		if ('production' === ENV) {
			this._socket = require('socket.io-client')();
			console.log('socket loaded production')
		} else {
			this._socket = require('socket.io-client')("http://localhost:3999");
			console.log('socket loaded dev')			
		}
	}
	get socket() {
		return this._socket;
	}
}
