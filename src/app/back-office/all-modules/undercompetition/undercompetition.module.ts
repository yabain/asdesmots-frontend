import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UndercompetitionRoutingModule } from './undercompetition-routing.module';
import { UndercompetitionComponent } from './undercompetition.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';


@NgModule({
  declarations: [
    UndercompetitionComponent
  ],
  imports: [
    CommonModule,
    UndercompetitionRoutingModule,
    TranslateModule,
    ProgressIndeterminateModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UndercompetitionModule { }
