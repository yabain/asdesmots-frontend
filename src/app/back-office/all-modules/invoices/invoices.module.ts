import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InvoicesCancelledComponent } from './invoices-cancelled/invoices-cancelled.component';
import { InvoicesDraftComponent } from './invoices-draft/invoices-draft.component';
import { InvoicesOverdueComponent } from './invoices-overdue/invoices-overdue.component';
import { InvoicesPaidComponent } from './invoices-paid/invoices-paid.component';
import { InvoicesRecurringComponent } from './invoices-recurring/invoices-recurring.component';
import { InvoicesSettingsComponent } from './invoices-settings/invoices-settings.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { InvoiceGridComponent } from './invoice-grid/invoice-grid.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { BankSettingsComponent } from './bank-settings/bank-settings.component';
import { TaxSettingsComponent } from './tax-settings/tax-settings.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoicesListComponent,
    InvoicesCancelledComponent,
    InvoicesDraftComponent,
    InvoicesOverdueComponent,
    InvoicesPaidComponent,
    InvoicesRecurringComponent,
    InvoicesSettingsComponent,
    AddInvoiceComponent,
    EditInvoiceComponent,
    InvoiceGridComponent,
    ViewInvoiceComponent,
    BankSettingsComponent,
    TaxSettingsComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    DataTablesModule
  ],
})
export class InvoicesModule {}
