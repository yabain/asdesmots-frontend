import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from './shared/guard/auth/authentication.guard';
import { AllModulesService } from 'src/app/shared/services/all-modules.service';
// import { AllModulesData } from 'src/assets/all-modules-data/all-modules-data';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationService } from './shared/services/translation/language.service';
import { ProgressIndeterminateModule } from './shared/elements/progress-indeterminate/progress-indeterminate.module';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from './back-office/all-modules/undercompetition/list-competition/pipe/format-date.pipe';
// import { FooterModule } from './back-office/shared/footer/footer.module';
// import {HttpClient, HttpClientModule} from '@angular/common/http';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProgressIndeterminateModule,
    CommonModule,
    // AuthentificationModule,
    ProgressIndeterminateModule,
    // FooterModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    FormsModule,
    DataTablesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [AllModulesService, AuthenticationGuard, TranslationService],
  bootstrap: [AppComponent],
  exports: [TranslateModule],
})
export class AppModule {}
