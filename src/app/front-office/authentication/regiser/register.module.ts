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
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [RegiserComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ProgressIndeterminateModule,
    TranslateModule,
    NgxIntlTelInputModule
  ]
})
export class RegisterModule { }
