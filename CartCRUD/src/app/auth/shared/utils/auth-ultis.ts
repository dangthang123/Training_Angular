import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    if (password) {
        const pattern = /^(?=.*[!@#$%^&*])(?=.*[A-Z])[A-Za-z\d!@#$%^&*]{8,32}$/;
        if (!pattern.test(password)) {
            return { 'invalidPassword': true };
        }
    }
    return null;
}

export function phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const phoneNumber = control.value;
        if (phoneNumber && phoneNumber.length !== 10) {
            return { 'invalidPhoneNumberLength': true };
        }

        if (phoneNumber && !/^\d+$/.test(phoneNumber)) {
            return { 'invalidPhoneNumberFormat': true };
        }

        return null;
    };
}


export function usernameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const username = control.value;
        if (!username) {
            return null;
        }

        const pattern = /^[a-zA-Z0-9]{3,20}$/; //
        if (!pattern.test(username)) {
            return { 'invalidUsername': true };
        }

        return null;
    };
}