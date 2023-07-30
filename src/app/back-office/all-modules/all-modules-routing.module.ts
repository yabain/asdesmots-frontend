import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllModulesComponent } from 'src/app/back-office/all-modules/all-modules.component';
import { AuthenticationGuard } from 'src/app/services/guard/auth/authentication.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "index",
    pathMatch: "full",
  },
  {
    path: "",
    component: AllModulesComponent,
    children: [

      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthenticationGuard],

      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./customers/customers.module').then((m) => m.CustomersModule),
        canActivate: [AuthenticationGuard],

      },
      {
        path: 'words',
        loadChildren: () =>
          import('./words/words.module').then((m) => m.WordsModule),
        canActivate: [AuthenticationGuard],

      },
      {
        path: 'arcarde',
        loadChildren: ()=> import('./arcarde/arcarde.module').then((m)=>m.ArcardeModule),
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'undercompetition',
        loadChildren: ()=> import('./undercompetition/undercompetition.module').then((m)=> m.UndercompetitionModule),
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'role',
        loadChildren: ()=> import('./role/role.module').then((m)=> m.RoleModule),
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
        canActivate: [AuthenticationGuard],

      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        canActivate: [AuthenticationGuard],

      },
      { path: '**', redirectTo: 'index', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllModulesRoutingModule { }
