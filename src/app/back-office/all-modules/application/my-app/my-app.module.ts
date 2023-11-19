import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAppRoutingModule } from './my-app-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MyAppRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class MyAppModule { }
