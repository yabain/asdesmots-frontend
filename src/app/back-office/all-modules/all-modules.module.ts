import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllModulesRoutingModule } from './all-modules-routing.module';
import { AllModulesComponent } from './all-modules.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from '../shared/sidemenu/sidemenu.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';
import { FooterModule } from '../shared/footer/footer.module';
import { GamePlayComponent } from './game-play/game-play.component';

@NgModule({
  declarations: [
    AllModulesComponent,
    SidemenuComponent,
    GamePlayComponent
  ],
  imports: [
    CommonModule,
    AllModulesRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FooterModule,
    ProgressIndeterminateModule,
    TranslateModule,
    ToastrModule.forRoot(
      {
        timeOut: 1500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    FormsModule,
  ]
})
export class AllModulesModule { }
