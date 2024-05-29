import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PasswordFunctions } from '../functions';

@Component({
  selector: 'password-validator-template',
  templateUrl: './validator-template.component.html',
  styleUrls: ['./validator-template.component.css'],
  providers: [PasswordFunctions]
})
export class ValidatorTemplateComponent implements OnInit {
  @Input() form!: FormGroup;
  
  constructor(public passwordFunctions: PasswordFunctions) { }

  ngOnInit(): void {
  
  }
  
  
  passwordsMatch(): boolean {
  console.log(this.form.value)
    return this.form.get('password').value === this.form.get('password_confirm').value;
  }

}
