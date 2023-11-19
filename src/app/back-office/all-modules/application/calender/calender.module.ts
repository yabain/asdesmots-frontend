import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalenderComponent } from './calender.component';
import { CalenderRoutingModule } from './calender-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [  ],
  imports: [CommonModule, CalenderRoutingModule, RouterModule],
})
export class CalenderModule {}
