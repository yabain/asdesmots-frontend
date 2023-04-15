import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './email.component';
import { EmailRoutingModule } from './email-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ ],
  imports: [CommonModule, EmailRoutingModule, RouterModule],
})
export class EmailModule {}
