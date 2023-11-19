import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAppComponent } from './add-app.component';
import { AddAppRoutingModule } from './add-app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    AddAppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddAppModule { }
