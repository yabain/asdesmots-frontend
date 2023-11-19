import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceCategoryComponent } from './invoice-category/invoice-category.component';
import { InvoiceItemsComponent } from './invoice-items/invoice-items.component';
import { ItemsComponent } from './items.component';

const routes: Routes = [
  {path:'',component:ItemsComponent,
  children: [
    { path: "invoice-items", component: InvoiceItemsComponent },
    { path: "invoice-category", component: InvoiceCategoryComponent},
]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
