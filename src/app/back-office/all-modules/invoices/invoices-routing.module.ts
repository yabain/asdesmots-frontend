import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/shared/guard/auth/authentication.guard';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { BankSettingsComponent } from './bank-settings/bank-settings.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { InvoiceGridComponent } from './invoice-grid/invoice-grid.component';
import { InvoicesCancelledComponent } from './invoices-cancelled/invoices-cancelled.component';
import { InvoicesDraftComponent } from './invoices-draft/invoices-draft.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { InvoicesOverdueComponent } from './invoices-overdue/invoices-overdue.component';
import { InvoicesPaidComponent } from './invoices-paid/invoices-paid.component';
import { InvoicesRecurringComponent } from './invoices-recurring/invoices-recurring.component';
import { InvoicesSettingsComponent } from './invoices-settings/invoices-settings.component';
import { InvoicesComponent } from './invoices.component';
import { TaxSettingsComponent } from './tax-settings/tax-settings.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: "invoices-list", component: InvoicesListComponent },
      { path: "invoices-paid", component: InvoicesPaidComponent},
      { path: "invoices-overdue", component: InvoicesOverdueComponent},
      { path: "invoices-draft", component: InvoicesDraftComponent},
      { path: "invoices-recurring", component: InvoicesRecurringComponent},
      { path: "invoices-cancelled", component: InvoicesCancelledComponent},
      { path: "add-invoice", component: AddInvoiceComponent },
      { path: "edit-invoice", component: EditInvoiceComponent },
      { path: "invoice-grid", component: InvoiceGridComponent },
      { path: "invoices-settings", component: InvoicesSettingsComponent },
      { path: "view-invoice", component: ViewInvoiceComponent },
      { path: "tax-settings", component: TaxSettingsComponent },
      { path: "bank-settings", component: BankSettingsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
