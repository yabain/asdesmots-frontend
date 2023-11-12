import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegiserComponent } from './regiser.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';;
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';

@NgModule({
  declarations: [RegiserComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
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
  ]
})
export class RegisterModule { }
