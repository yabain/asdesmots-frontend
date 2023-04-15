import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    RouterModule
  ]
})
export class ChangePasswordModule { }
