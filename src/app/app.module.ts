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
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslationService } from './shared/services/translation/language.service';
import { ProgressIndeterminateModule } from './shared/elements/progress-indeterminate/progress-indeterminate.module';
import { CommonModule } from '@angular/common';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { EmailVerificationModule } from './front-office/authentication/email-verification/email-verification.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const config: SocketIoConfig = { url: 'http://127.0.0.1:3000', options: {}};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProgressIndeterminateModule,
    CommonModule,
    // AuthentificationModule,
    ProgressIndeterminateModule,
    EmailVerificationModule,
    // FooterModule,
    ToastrModule.forRoot(
      {
        timeOut: 1500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    BrowserAnimationsModule,
    FormsModule,
    DataTablesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    AllModulesService,
    AuthenticationGuard,
    TranslationService
  ],
  bootstrap: [
    AppComponent,
  ],
  exports: [TranslateModule]
})
export class AppModule {}
