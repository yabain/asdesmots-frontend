import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicInputsRoutingModule } from './basic-inputs-routing.module';
import { RouterModule } from '@angular/router';
import { BasicInputsComponent } from './basic-inputs.component';

@NgModule({
  declarations: [BasicInputsComponent],
  imports: [
    CommonModule,
    BasicInputsRoutingModule,
    RouterModule
  ]
})
export class BasicInputsModule { }
