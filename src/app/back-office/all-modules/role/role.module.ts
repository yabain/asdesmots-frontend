import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleUsersComponent } from './role-users/role-users.component';
import { RoleCreateComponent } from './role-create/role-create.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoleComponent,
    RoleListComponent,
    RoleUsersComponent,
    RoleCreateComponent,
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    ReactiveFormsModule
  ]
})
export class RoleModule { }
