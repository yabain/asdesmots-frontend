import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { LevelDetailsComponent } from './level-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';

@NgModule({
  declarations: [
    LevelDetailsComponent
],
imports: [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  ProgressIndeterminateModule,
  FormsModule,
  TranslateModule
],
exports: [
  LevelDetailsComponent
]
})
export class LevelDetailsModule { }
