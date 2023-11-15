import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string,formTilte:string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        // se pointer sur  Pwd or confirm Pwd dans le cas signupForm
        const matchingControl = formGroup.controls[matchingControlName];

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value && formTilte =='Signup') {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }

        // ternary operator
        // (control.value !== matchingControl.value) ?
        //     matchingControl.setErrors({ mustMatch: true }) :
        //     matchingControl.setErrors(null);

    }
}