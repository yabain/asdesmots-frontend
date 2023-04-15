import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxTypesComponent } from './tax-types.component';
import { TaxTypesRoutingModule } from './tax-types-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ TaxTypesComponent ],
  imports: [CommonModule, TaxTypesRoutingModule, RouterModule],
})
export class TaxTypesModule {}
