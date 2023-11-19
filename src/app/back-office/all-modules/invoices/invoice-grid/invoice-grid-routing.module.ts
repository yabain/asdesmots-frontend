import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceGridComponent } from './invoice-grid.component';

const routes: Routes = [{ path: '', component: InvoiceGridComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceGridRoutingModule { }
