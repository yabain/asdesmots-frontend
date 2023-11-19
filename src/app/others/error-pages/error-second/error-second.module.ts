import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorSecondRoutingModule } from './error-second-routing.module';
import { ErrorSecondComponent } from './error-second.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ErrorSecondComponent],
  imports: [
    CommonModule,
    ErrorSecondRoutingModule,
    RouterModule
  ]
})
export class ErrorSecondModule { }
