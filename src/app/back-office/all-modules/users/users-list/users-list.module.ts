import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './users-list.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UsersListRoutingModule
  ]
})
export class UsersListModule { }
