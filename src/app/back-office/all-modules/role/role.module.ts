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


@NgModule({
  declarations: [
    RoleComponent,
    RoleListComponent,
    RoleUsersComponent,
    RoleCreateComponent,
    SidemenuroleComponent,
    RolepermissionlistComponent,
    ListUsersComponent,

  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  DataTablesModule
  ]
})
export class RoleModule { }
