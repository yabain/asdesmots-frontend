import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCompetitionRoutingModule } from './list-competition-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ListCompetitionRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),

  ]
})
export class ListCompetitionModule { }
