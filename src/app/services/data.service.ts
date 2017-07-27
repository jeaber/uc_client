import { Injectable } from '@angular/core';
import { SocketService } from './../services/socket.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
interface accountForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface contactForm {
    streetAddress: string;
    city: string;
    state: string;
    postalCode: number;
    phone: number;
}
interface fundingForm {
    accountType: string;
    accountNumber: number;
    routingNumber: number;
}
@Injectable()
export class DataService {
    private _accountForm: accountForm;
    public _contactForm: contactForm;
    public _fundingForm: fundingForm;
    constructor(private http: Http, public io: SocketService) {
    }

    public accountForm(form: accountForm) {
        // need to verify email mailchimp
        this._accountForm = form;
        console.log("SUBMITTING ACCOUNT", form)
        this.io.socket.emit('accountForm', form);
    }
    public contactForm(form: contactForm) {
        this._contactForm = form;
        console.log("SUBMITTING CONTACT", form)        
        this.io.socket.emit('contactForm', form, this._accountForm);
    }
    public fundingForm(form: fundingForm) {
        this._fundingForm = form;
        console.log("SUBMITTING FUNDING", form)        
        // need to verify bank account, double ACH deposits
        this.io.socket.emit('fundingForm', form, this._accountForm);
    }
    
}
