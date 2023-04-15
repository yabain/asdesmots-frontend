import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebStorage {
  public Loginvalue = new BehaviorSubject<any>(0);
  public Createaccountvalue = new BehaviorSubject<any>(0);
  public Forgotpasswordvalue = new BehaviorSubject<any>(0);
  constructor(private router: Router) { }

  /**
   * Create account Function call from Registerpage
   * @param uservalue from user form value
   */
  public Createaccount(uservalue: any): void {
    let Rawdata: any = localStorage.getItem('Loginusers');
    let Pdata: any = [];
    Pdata = JSON.parse(Rawdata);
    const Eresult: any = Pdata.find(({ email }: any) => email === uservalue.email);
    if (Eresult) {
      this.Createaccountvalue.next('Cet email est déjà uutilisé');
    } else {
      Pdata.push(uservalue);
      const jsonData = JSON.stringify(Pdata);
      localStorage.setItem('Loginusers', jsonData);
      this.Login(uservalue);
    }
  }

  /**
   * Login Functionality call from Login
   * @param uservalue from login page
   */
  public Login(uservalue: any): void {
    this.Createtoken(uservalue);
    uservalue.field_password = '***********';
    this.Loginvalue.next('Login success');
    this.Loginvalue.next(0);

    const jsonData = JSON.stringify(uservalue);
    localStorage.setItem('Loginusers', jsonData);


  }

  /**
   * Create Token function for authendication
   * @param uservalue recived from login function
   */
  public Createtoken(uservalue: any) {
    var result = 'ABCDEFGHI' + uservalue.email + 'ghijklmnopqrs' + 'z01234567';
    localStorage.setItem('LoginData', result);
  }

  /**
   * Two Storage are used
   */
  public Deleteuser() {
    localStorage.removeItem('Loginusers');
    localStorage.removeItem('LoginData');
  }

  /**
   * called from Login page init statement
   */
  public Checkuser(): void {
    let users = localStorage.getItem('Loginusers');
    if (users != null) {
      this.router.navigate(['/index']);
    }
    // else if (users === null) {
    //   let password = [
    //     {
    //       email: 'admin@dreamguys.in',
    //       password: '123456',
    //     },
    //   ];
    //   const jsonData = JSON.stringify(password);
    //   localStorage.setItem('Loginusers', jsonData);
    // }
  }

  /**
   * Forgot password function
   * @param uservalue email object recived from Forgot password
   */
  public Forgotpassword(uservalue: any): void {
    let Rawdata: any = localStorage.getItem('Loginusers');
    let Pdata: any = [];
    Pdata = JSON.parse(Rawdata);
    const Eresult = Pdata.find(({ email }: any) => email === uservalue.email);
    if (Eresult) {
      this.Forgotpasswordvalue.next(Eresult);
    } else {
      this.Forgotpasswordvalue.next('Email non valid');
    }
  }
}
