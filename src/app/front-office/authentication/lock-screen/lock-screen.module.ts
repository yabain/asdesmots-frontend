import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockScreenRoutingModule } from './lock-screen-routing.module';
import { LockScreenComponent } from './lock-screen.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LockScreenComponent],
  imports: [
    CommonModule,
    LockScreenRoutingModule,
    RouterModule
  ]
})
export class LockScreenModule { }
