import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from 'src/app/back-office/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('src/app/back-office/all-modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'forgot-pass',
        loadChildren: () =>
          import(
            'src/app/front-office/authentication/forgot-password/forgot-password.module'
          ).then((m) => m.ForgotPasswordModule),
      },
      {
        path: 'login-form',
        loadChildren: () =>
          import('src/app/front-office/authentication/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('src/app/back-office/pages/blog/blog/blog.module').then((m) => m.BlogModule),
      },
      {
        path: 'add-blog',
        loadChildren: () =>
          import('src/app/back-office/pages/blog/add-blog/add-blog.module').then(
            (m) => m.AddBlogModule
          ),
      },
      {
        path: 'edit-blog',
        loadChildren: () =>
          import('src/app/back-office/pages/blog/add-blog/add-blog.module').then(
            (m) => m.AddBlogModule
          ),
      },
      {
        path: 'blog-details',
        loadChildren: () =>
          import('src/app/back-office/pages/blog/blog-details/blog-details.module').then(
            (m) => m.BlogDetailsModule
          ),
      },
      {
        path: 'admin-invoice',
        loadChildren: () =>
          import('src/app/back-office/invoice/admin-invoice.module').then(
            (m) => m.AdminInvoiceModule
          ),
      },
      {
        path: 'mentor-profile',
        loadChildren: () =>
          import('src/app/back-office/mentor-profile/mentor-profile.module').then(
            (m) => m.MentorProfileModule
          ),
      },
      {
        path: 'lock-screen',
        loadChildren: () =>
          import('src/app/back-office/pages/authendication/lock-screen/lock-screen.module').then(
            (m) => m.LockScreenModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('src/app/back-office/pages/authendication/regiser/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: 'blank-page',
        loadChildren: () =>
          import('src/app/back-office/pages/blank-page/blank-page.module').then(
            (m) => m.BlankPageModule
          ),
      },
      {
        path: 'error-first',
        loadChildren: () =>
          import('src/app/back-office/pages/error-pages/error-first/error-first.module').then(
            (m) => m.ErrorFirstModule
          ),
      },
      {
        path: 'error-second',
        loadChildren: () =>
          import('src/app/back-office/pages/error-pages/error-second/error-second.module').then(
            (m) => m.ErrorSecondModule
          ),
      },
      {
        path: 'components',
        loadChildren: () =>
          import('src/app/back-office/ui-interface/components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: 'basic-input',
        loadChildren: () =>
          import('src/app/back-office/ui-interface/forms/basic-inputs/basic-inputs.module').then(
            (m) => m.BasicInputsModule
          ),
      },
      {
        path: 'form-validation',
        loadChildren: () =>
          import(
            'src/app/back-office/ui-interface/forms/form-validation/form-validation.module'
          ).then((m) => m.FormValidationModule),
      },
      {
        path: 'horizondal-form',
        loadChildren: () =>
          import(
            'src/app/back-office/ui-interface/forms/horizondal-form/horizondal-form.module'
          ).then((m) => m.HorizondalFormModule),
      },
      {
        path: 'input-groups',
        loadChildren: () =>
          import('src/app/back-office/ui-interface/forms/input-groups/input-groups.module').then(
            (m) => m.InputGroupsModule
          ),
      },
      {
        path: 'vertical-form',
        loadChildren: () =>
          import(
            'src/app/back-office/ui-interface/forms/vertical-form/vertical-form.module'
          ).then((m) => m.VerticalFormModule),
      },
      {
        path: 'form-mask',
        loadChildren: () =>
          import('src/app/back-office/ui-interface/forms/form-mask/form-mask.module').then(
            (m) => m.FormMaskModule
          ),
      },
      {
        path: 'basic-tables',
        loadChildren: () =>
          import('src/app/back-office/ui-interface/tables/basic-tables/basic-tables.module').then(
            (m) => m.BasicTablesModule
          ),
      },
      {
        path: 'admin-data-table',
        loadChildren: () =>
          import(
            'src/app/back-office/ui-interface/tables/admin-data-table/admin-data-table.module'
          ).then((m) => m.AdminDataTableModule),
      },
      {
        path: 'appointment',
        loadChildren: () =>
          import('src/app/back-office/appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'specialities',
        loadChildren: () =>
          import('src/app/back-office/specialities/specialities.module').then(
            (m) => m.SpecialitiesModule
          ),
      },
      {
        path: 'mentor',
        loadChildren: () =>
          import('src/app/back-office/mentor/mentor.module').then((m) => m.MentorModule),
      },
      {
        path: 'mentee',
        loadChildren: () =>
          import('src/app/back-office/mentee/mentee.module').then((m) => m.MenteeModule),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('src/app/back-office/transactions/transactions.module').then(
            (m) => m.TransactionsModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('src/app/back-office/settings/settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'reviews',
        loadChildren: () =>
          import('src/app/back-office/reviews/reviews.module').then((m) => m.ReviewsModule),
      },
      {
        path: 'invoice-reports',
        loadChildren: () =>
          import('src/app/back-office/invoice-reports/invoice-reports.module').then(
            (m) => m.InvoiceReportsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
