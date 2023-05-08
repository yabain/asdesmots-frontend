import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthenticationGuard } from './shared/guard/auth/authentication.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'auth', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'register', redirectTo: 'auth/register', pathMatch: 'full' },
  { path: 'reset', redirectTo: 'auth/rest-password', pathMatch: 'full' },
  { path: 'error404', redirectTo: 'front/error404', pathMatch: 'full' },
  { path: 'forgot-pass', redirectTo: 'forgot-pwd', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./front-office/authentication/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./front-office/welcome/welcome.module').then(
        (m) => m.WelcomeModule
      ),
  },
  {
    path: 'mailconf',
    loadChildren: () =>
      import(
        './front-office/authentication/mail-link/mail-link.module'
      ).then((m) => m.MailLinkModule),
  },
  {
    path: 'forgot-pwd',
    loadChildren: () =>
      import(
        './front-office/authentication/forgot-pwd/forgot-pwd.module'
      ).then((m) => m.ForgotPwdModule),
  },
  {
    path: 'new-pwd',
    loadChildren: () =>
      import(
        './front-office/authentication/new-pwd/new-pwd.module'
      ).then((m) => m.NewPwdModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./front-office/authentication/regiser/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'lock-screen',
    loadChildren: () =>
      import('./front-office/authentication/lock-screen/lock-screen.module').then(
        (m) => m.LockScreenModule
      ),
  },
  {
    path: 'error-first',
    loadChildren: () =>
      import('./others/error-pages/error-first/error-first.module').then(
        (m) => m.ErrorFirstModule
      ),
  },
  {
    path: 'error-second',
    loadChildren: () =>
      import('./others/error-pages/error-second/error-second.module').then(
        (m) => m.ErrorSecondModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./back-office/all-modules/all-modules.module').then(m => m.AllModulesModule),
    canActivate: [AuthenticationGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
}),

  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
