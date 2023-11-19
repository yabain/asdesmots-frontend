import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditEstimateRoutingModule } from './edit-estimate-routing.module';
import { EditEstimateComponent } from './edit-estimate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    EditEstimateRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditEstimateModule { }
