import { Injectable } from '@angular/core';
@Injectable()
export class ValidationService {
  static getValidatorErrorMessage(code: string) {
    let config = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'At least 8 characters long, and contain a number.',
      'invalidConfirmPassword': 'Passwords must match!'
    };
    return config[code];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }
  static ssnValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[0-9]{4}/)) {
      return null;
    } else {
      return { 'invalidSsnAddress': true };
    }
  }
  static dobValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)) {
      return null;
    } else {
      return { 'invalidDobAddress': true };
    }
  }
  static stateValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.toUpperCase().match(/^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/)) {
      return null;
    } else {
      return { 'invalidStateAddress': true };
    }

  }
  static passwordValidator(control) {
    // {7,100}           - Assert password is between 7 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
  static passwordConfirmValidator(control) {
    if (control.parent) {
      let pass = control.parent.value;
      console.log('CONFIRM PASSWORD', pass, control.value);
      if (pass.password === control.value) {
        return null;
      } else {
        return { 'invalidConfirmPassword': true };
      }
    }
  }
  static bankRoutingValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|80)([0-9]{7})$/)) {
      return null;
    } else {
      return { 'invalidBankRouting': true };
    }
  }
  static taxidValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.toUpperCase().match(/\d{2}-\d{7}/)) {
      return null;
    } else {
      return { 'invalidTaxIdAddress': true };
    }
  }
}