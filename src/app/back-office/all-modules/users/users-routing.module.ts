import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/shared/guard/auth/authentication.guard';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {path:'',component:UsersComponent,
  canActivate: [AuthenticationGuard],
  children: [
    { path: "users-list", component: UsersListComponent }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
