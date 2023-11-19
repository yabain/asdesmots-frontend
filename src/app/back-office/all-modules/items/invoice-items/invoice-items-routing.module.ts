import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceItemsComponent } from './invoice-items.component';

const routes: Routes = [{ path: '', component: InvoiceItemsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceItemsRoutingModule { }
