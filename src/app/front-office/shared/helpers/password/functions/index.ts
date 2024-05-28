export class PasswordFunction {

    uppercaseChar(value: string): boolean {
        return /[A-Z]/.test(value);
    }
    
    numberChar(value: string): boolean {
        return /\d/.test(value);
    }
    
    specialChar(value: string): boolean {
        return /[!@#$%^&*(),.?":{}|<>]/.test(value);
    }
}