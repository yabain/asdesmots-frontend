import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { WordDetailsComponent } from './word-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';

@NgModule({
  declarations: [
    WordDetailsComponent
],
imports: [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  ProgressIndeterminateModule,
  FormsModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
  })
],
exports: [
  WordDetailsComponent
]
})
export class WordDetailsModule { }
