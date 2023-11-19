import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataService } from '../services/data.service';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModalModule.forRoot(),
  ],
})
export class AdminModule {}
