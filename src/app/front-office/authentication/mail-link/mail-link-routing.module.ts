import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkRecieveComponent } from './link-recieve/link-recieve.component';
import { MailLinkComponent } from './mail-link/mail-link.component';

const routes: Routes = [
  // { path: '', redirectTo: 'link-recieve', pathMatch: 'full' },
  {
    path: '',
    component: LinkRecieveComponent
  },
  {
    path: 'mail-confirm',
    component: MailLinkComponent
  },
  {
    path: 'link-recieve',
    component: LinkRecieveComponent
  },
  {
    path: '**',
    component: LinkRecieveComponent
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailLinkRoutingModule { }
