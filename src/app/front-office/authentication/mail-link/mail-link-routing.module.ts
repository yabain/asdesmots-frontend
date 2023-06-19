import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkReceiveComponent } from './link-receive/link-receive.component';
import { MailLinkComponent } from './mail-link/mail-link.component';

const routes: Routes = [
  { path: '', redirectTo: 'link-receive', pathMatch: 'full' },
  {
    path: 'mail-confirm',
    component: MailLinkComponent
  },
  {
    path: 'link-receive',
    component: LinkReceiveComponent
  },
  {
    path: '**',
    redirectTo: 'link-receive', pathMatch: 'full'
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailLinkRoutingModule { }
