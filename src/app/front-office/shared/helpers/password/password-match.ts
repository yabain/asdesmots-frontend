import { FormGroup } from "@angular/forms";

export class PasswordMatch {

    static MatchingPasswords(password: string,confirmPassword: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[password],
                passwordConfirmationInput = group.controls[confirmPassword];
            if (passwordInput.value !== passwordConfirmationInput.value) {
              return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
        }
    }
}