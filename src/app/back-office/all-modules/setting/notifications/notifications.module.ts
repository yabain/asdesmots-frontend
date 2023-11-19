import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ NotificationsComponent ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    RouterModule
  ]
})

export class NotificationsModule { }
