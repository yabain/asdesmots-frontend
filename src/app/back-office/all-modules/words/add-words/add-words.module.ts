import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWordsRoutingModule } from './add-words-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddWordsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
  ]
})
export class AddWordsModule {}

