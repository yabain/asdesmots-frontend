import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleUsersComponent } from './role-users/role-users.component';
import { RoleCreateComponent } from './role-create/role-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { SidemenuroleComponent } from './sidemenurole/sidemenurole.component';
import { RolepermissionlistComponent } from './rolepermissionlist/rolepermissionlist.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { DataTablesModule } from 'angular-datatables';
import { PermissionsCardComponent } from './role-create/permissions-card/permissions-card.component';
import { CustomPaginationModule } from 'src/app/shared/custom-pagination/custom-pagination.module';


@NgModule( {
  declarations: [
    RoleComponent,
    RoleListComponent,
    RoleUsersComponent,
    RoleCreateComponent,
    SidemenuroleComponent,
    RolepermissionlistComponent,
    ListUsersComponent,
    PermissionsCardComponent,

  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DataTablesModule,
    CustomPaginationModule,
  ]
} )
export class RoleModule { }
