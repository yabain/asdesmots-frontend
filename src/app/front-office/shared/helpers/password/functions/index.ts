export class PasswordFunctions {

    hashedPassword:boolean = true;
    
    uppercaseChar(value: string): boolean {
        return /[A-Z]/.test(value);
    }
    
    numberChar(value: string): boolean {
        return /\d/.test(value);
    }
    
    specialChar(value: string): boolean {
        return /[!@#$%^&*(),.?":{}|<>]/.test(value);
    }
    
    togglePasswordVisibility() {
        this.hashedPassword = !this.hashedPassword;
    }
}