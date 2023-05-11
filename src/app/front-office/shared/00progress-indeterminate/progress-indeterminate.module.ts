import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressIndeterminateComponent } from './progress-indeterminate.component';

@NgModule({
  declarations: [
    ProgressIndeterminateComponent
],
imports: [
  CommonModule,
  RouterModule,
  
],
exports: [ProgressIndeterminateComponent]
})
export class ProgressIndeterminateModule { }
