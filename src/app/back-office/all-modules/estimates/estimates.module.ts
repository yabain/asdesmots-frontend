import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstimatesRoutingModule } from './estimates-routing.module';
import { EstimatesComponent } from './estimates.component';
import { EstimatesListComponent } from './estimates-list/estimates-list.component';
import { RouterModule } from '@angular/router';
import { AddEstimatesComponent } from './add-estimates/add-estimates.component';
import { EditEstimateComponent } from './edit-estimate/edit-estimate.component';
import { ViewEstimateComponent } from './view-estimate/view-estimate.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    EstimatesComponent,
    EstimatesListComponent,
    AddEstimatesComponent,
    EditEstimateComponent,
    ViewEstimateComponent,
  ],
  imports: [
    CommonModule,
    EstimatesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ],
})
export class EstimatesModule {}
