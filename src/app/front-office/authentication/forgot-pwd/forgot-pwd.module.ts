import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPwdComponent } from './forgot-pwd.component';
import { ForgotPwdRoutingModule } from './forgot-pwd-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';

@NgModule({
  declarations: [ForgotPwdComponent],
  imports: [
    CommonModule,
    ForgotPwdRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ProgressIndeterminateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
})
export class ForgotPwdModule { }
