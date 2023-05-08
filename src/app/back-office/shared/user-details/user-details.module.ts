import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { UserDetailsComponent } from './user-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserDetailsComponent
],
imports: [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
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
  UserDetailsComponent
]
})
export class UserDetailsModule { }
