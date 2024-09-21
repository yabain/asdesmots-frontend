import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamePlayRoutingModule } from './game-play-routing.module';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { OncommingComponent } from './oncomming/oncomming.component';
import { StartedComponent } from './started/started.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarPhotoComponent } from './avatar-photo/avatar-photo.component';
import { GamePlaceHolderComponent } from './started/game-place-holder/game-place-holder.component';
import { SharedModule } from '../../shared/shared.module';
import { OncommingListPlaceholderComponent } from './oncomming/oncomming-list-placeholder/oncomming-list-placeholder.component';
import { CompetitionPlayingComponent } from './started/competition-playing/competition-playing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListComponent,
    OncommingComponent,
    StartedComponent,
    AvatarPhotoComponent,
    GamePlaceHolderComponent,
    OncommingListPlaceholderComponent,
    CompetitionPlayingComponent
  ],
  imports: [
    CommonModule,
    GamePlayRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    NgbModule
  ]
})
export class GamePlayModule { }
