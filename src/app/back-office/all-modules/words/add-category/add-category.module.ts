import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryRoutingModule } from './add-category-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddCategoryRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AddCategoryModule { }
