import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UndercompetitionRoutingModule } from './undercompetition-routing.module';
import { UndercompetitionComponent } from './undercompetition.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';
import { ListCompetitionComponent } from './list-competition/list-competition.component';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { UpdateCompetitionComponent } from './update-competition/update-competition.component';
import { ListCretariasComponent } from './list-cretarias/list-cretarias.component';
import { GetParentNamePipe } from './list-competition/pipe/get-parent-name.pipe';


@NgModule({
  declarations: [
    UndercompetitionComponent,
    UpdateCompetitionComponent,
    ListCompetitionComponent,
    ListCretariasComponent,
    GetParentNamePipe
  ],
  imports: [
    CommonModule,
    UndercompetitionRoutingModule,
    TranslateModule,
    ProgressIndeterminateModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ]
})
export class UndercompetitionModule { }
