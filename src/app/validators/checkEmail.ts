import { getObjectFromLocalStorage } from 'src/app/shared/genericFunction';
import { FormGroup } from '@angular/forms';

export function CheckEmail(email: string) {
    return (formGroup: FormGroup) => {
        const controlEmail = formGroup.controls[email];
        let users = getObjectFromLocalStorage("users");
        let user = users.find((obj: any) => { return obj.email == controlEmail.value });
        
        if (user) {
            controlEmail.setErrors({ emailExist: true });
        } else {
            controlEmail.setErrors(null);
        }
    }
}