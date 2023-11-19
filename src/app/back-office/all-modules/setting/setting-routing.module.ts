import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'tax-types',
        loadChildren: () =>
          import('./tax-types/tax-types.module').then(
            (m) => m.TaxTypesModule
          ),
      },
      {
        path: 'delete-account',
        loadChildren: () =>
          import('./delete-account/delete-account.module').then(
            (m) => m.DeleteAccountModule
          ),
      },
      {
        path: 'expense-category',
        loadChildren: () =>
          import('./expense-category/expese-category.module').then((m) => m.ExpenseCategoryModule),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.module').then((m) => m.NotificationsModule),
      },
      {
        path: 'preferences',
        loadChildren: () =>
          import('./preferences/preferences.module').then((m) => m.PreferencesModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./change-password/change-password.module').then((m) => m.ChangePasswordModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
