import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleComponent } from './role.component';
import { RoleUsersComponent } from './role-users/role-users.component';
import { RoleCreateComponent } from './role-create/role-create.component';

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
        path: 'users',
        component: RoleUsersComponent,
      },
      {
        path: 'create',
        component: RoleCreateComponent
      }
    ]
  },
  {
    path:'**',
    redirectTo: "'list'",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
