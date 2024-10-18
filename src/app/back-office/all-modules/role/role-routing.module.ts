import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleComponent } from './role.component';
import { RoleUsersComponent } from './role-users/role-users.component';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RolepermissionlistComponent } from './rolepermissionlist/rolepermissionlist.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListUserOldComponent } from './list-user-old/list-user-old.component';

const routes: Routes = [
       {
              path: '',
              component: RoleComponent,
              children: [
                     {
                            path: 'list',
                            component: RoleListComponent
                     },
                     {
                            path: 'users/:idrole',
                            component: RoleUsersComponent,
                     },
                     {
                            path: 'create',
                            component: RoleCreateComponent
                     },
                     {
                            path: 'list/permission/:id',
                            component: RolepermissionlistComponent
                     },
                     {
                            path: 'addrole/users',
                            component: ListUsersComponent
                     }

                     ,
                     {
                            path: 'addrole/users2',
                            component: ListUserOldComponent
                     }

              ]
       },
       {
              path: '**',
              redirectTo: "'list'",
              pathMatch: 'full'
       }
];

@NgModule( {
       imports: [ RouterModule.forChild( routes ) ],
       exports: [ RouterModule ]
} )
export class RoleRoutingModule { }
