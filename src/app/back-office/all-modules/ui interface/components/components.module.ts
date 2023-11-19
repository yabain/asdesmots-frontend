import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ComponentsComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    RouterModule
  ]
})
export class ComponentsModule { }
