import { Validators } from "@angular/forms";

export class PasswordFunctions {

    hashedPassword:boolean = true;
    patern = Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[_!?&$*,.';+\-@#\$%\^&\*])(?=.{8,})/)
    
    uppercaseChar(value: string): boolean {
        return /[A-Z]/.test(value);
    }
    
    numberChar(value: string): boolean {
        return /\d/.test(value);
    }
    
    specialChar(value: string): boolean {
        return /[_!?&$*,.';+\-@#\$%\^&\*]/.test(value);
    }
    
    togglePasswordVisibility() {
        this.hashedPassword = !this.hashedPassword;
    }
}