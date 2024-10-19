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
import { ListUserOldComponent } from './list-user-old/list-user-old.component';
import { ArcadeListPlaceholderComponent } from '../arcarde/list-arcarde/arcade-list-placeholder/arcade-list-placeholder.component';
import { OncommingListPlaceholderComponent } from '../game-play/oncomming/oncomming-list-placeholder/oncomming-list-placeholder.component';
import { GamePlayModule } from '../game-play/game-play.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedModule2 } from 'src/app/shared/shared.module2';


@NgModule( {
       declarations: [
              RoleComponent,
              RoleListComponent,
              RoleUsersComponent,
              RoleCreateComponent,
              SidemenuroleComponent,
              RolepermissionlistComponent,
              ListUsersComponent,
              ListUserOldComponent,
              PermissionsCardComponent,
              ListUserOldComponent


       ],
       imports: [
              CommonModule,
              SharedModule2,
              RoleRoutingModule,
              FormsModule,
              ReactiveFormsModule,
              TranslateModule,
              DataTablesModule,
              CustomPaginationModule,
              TranslateModule.forRoot()

       ]
} )
export class RoleModule { }
