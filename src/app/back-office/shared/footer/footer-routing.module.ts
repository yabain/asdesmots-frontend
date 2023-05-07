import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer.component';

const routes: Routes = [
  { path: '', redirectTo: 'front', pathMatch: 'full' },
  {
    path: 'footer',
    component: FooterComponent
  },
  { path: '**', redirectTo: 'footer', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FooterRoutingModule { }
