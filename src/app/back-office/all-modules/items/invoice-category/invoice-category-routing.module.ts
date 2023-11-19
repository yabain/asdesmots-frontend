import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceCategoryComponent } from './invoice-category.component';

const routes: Routes = [{ path: '', component: InvoiceCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceCategoryRoutingModule { }
