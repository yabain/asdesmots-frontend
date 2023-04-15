import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAccountComponent } from './delete-account.component';
import { DeleteAccountRoutingModule } from './delete-account-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ DeleteAccountComponent ],
  imports: [CommonModule, DeleteAccountRoutingModule,RouterModule],
})
export class DeleteAccountModule {}
