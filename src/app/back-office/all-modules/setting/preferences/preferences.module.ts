import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesComponent } from './preferences.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ PreferencesComponent ],
  imports: [
    CommonModule,
    PreferencesRoutingModule,
    ModalModule.forRoot(),
    RouterModule
  ]
})

export class PreferencesModule { }
