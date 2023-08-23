import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamePlayRoutingModule } from './game-play-routing.module';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { OncommingComponent } from './oncomming/oncomming.component';
import { StartedComponent } from './started/started.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    OncommingComponent,
    StartedComponent
  ],
  imports: [
    CommonModule,
    GamePlayRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

  ]
})
export class GamePlayModule { }
