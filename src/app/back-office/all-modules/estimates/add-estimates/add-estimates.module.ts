import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEstimatesComponent } from './add-estimates.component';
import { AddstimatesRoutingModule } from './add-estimates-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddstimatesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AddEstimatesModule { }
