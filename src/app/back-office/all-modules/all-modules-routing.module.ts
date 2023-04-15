import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../../shared/guard/auth/authentication.guard';
import { AllModulesComponent } from 'src/app/back-office/all-modules/all-modules.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "index",
    pathMatch: "full",
  },
  {
    path:"",
    component:AllModulesComponent,
    children:[
      {
        path: 'index',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthenticationGuard],

      },
  {
    path: 'dashboard-two',
    loadChildren: () =>
    import('./dashboards/dashboard-two/dashboard-two.module').then(m => m.DashboardTwoModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'dashboard-three',
    loadChildren: () => import('./dashboards/dashboard-three/dashboard-three.module').then(m => m.DashboardThreeModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'dashboard-four',
    loadChildren: () =>
    import('./dashboards/dashboard-four/dashboard-four.module').then(m => m.DashboardFourModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'dashboard-five',
    loadChildren: () =>
    import('./dashboards/dashboard-five/dashboard-five.module').then(m => m.DashboardFiveModule),
    canActivate: [AuthenticationGuard],
  },
      {
          path: 'customers',
          loadChildren: () =>
            import('./customers/customers.module').then((m) => m.CustomersModule),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'estimates',
          loadChildren: () =>
            import('./estimates/estimates.module').then((m) => m.EstimatesModule),
          canActivate: [AuthenticationGuard],
        },
        {
          path: 'invoices',
          loadChildren: () =>
            import('./invoices/invoices.module').then((m) => m.InvoicesModule),
          canActivate: [AuthenticationGuard],
        },
        {
          path: 'items',
          loadChildren: () =>
            import('./items/items.module').then((m) => m.ItemsModule),
          canActivate: [AuthenticationGuard],
        },
        {
          path: 'payments',
          loadChildren: () =>
            import('./payments/payments.module').then(
              (m) => m.PaymentsModule
            ),
          canActivate: [AuthenticationGuard],
        },
        {
          path: 'expenses',
          loadChildren: () =>
            import('./expenses/expenses.module').then(
              (m) => m.ExpensesModule
            ),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'reports',
          loadChildren: () =>
            import('./reports/reports.module').then(
              (m) => m.ReportsModule
            ),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'setting',
          loadChildren: () =>
            import('./setting/setting.module').then((m) => m.SettingModule),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'application',
          loadChildren: () =>
            import('./application/application.module').then((m) => m.ApplicationModule),
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
        {
          path: 'users',
          loadChildren: () =>
            import('./users/users.module').then(
              (m) => m.UsersModule
            ),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'blank-page',
          loadChildren: () =>
            import('./blank-page/blank-page.module').then(
              (m) => m.BlankPageModule
            ),
        },
        {
          path: 'maps-vector',
          loadChildren: () =>
            import('./mapvector/mapvector.module').then(
              (m) => m.MapvectorModule
            ),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'components',
          loadChildren: () =>
            import('./ui interface/components/components.module').then(
              (m) => m.ComponentsModule
            ),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'basic-input',
          loadChildren: () =>
            import('./ui interface/forms/basic-inputs/basic-inputs.module').then(
              (m) => m.BasicInputsModule
            ),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'form-mask',
          loadChildren: () =>
            import('./ui interface/forms/form-mask/form-mask.module').then(
              (m) => m.FormMaskModule
            ),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'form-validation',
          loadChildren: () =>
            import(
              './ui interface/forms/form-validation/form-validation.module'
            ).then((m) => m.FormValidationModule),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'horizondal-form',
          loadChildren: () =>
            import(
              './ui interface/forms/horizondal-form/horizondal-form.module'
            ).then((m) => m.HorizondalFormModule),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'input-groups',
          loadChildren: () =>
            import('./ui interface/forms/input-groups/input-groups.module').then(
              (m) => m.InputGroupsModule
            ),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'vertical-form',
          loadChildren: () =>
            import(
              './ui interface/forms/vertical-form/vertical-form.module'
            ).then((m) => m.VerticalFormModule),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'basic-tables',
          loadChildren: () =>
            import('./ui interface/tables/basic-tables/basic-tables.module').then(
              (m) => m.BasicTablesModule
            ),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'admin-data-table',
          loadChildren: () =>
            import(
              './ui interface/tables/admin-data-table/admin-data-table.module'
            ).then((m) => m.AdminDataTableModule),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'transactions',
          loadChildren: () =>
            import('./transactions/transactions.module').then(
              (m) => m.TransactionsModule
            ),
          canActivate: [AuthenticationGuard],

        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllModulesRoutingModule { }
