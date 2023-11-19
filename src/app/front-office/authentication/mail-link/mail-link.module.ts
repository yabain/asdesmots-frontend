import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';
import { MailLinkRoutingModule } from './mail-link-routing.module';
import { LinkRecieveComponent } from './link-recieve/link-recieve.component';
import { MailLinkComponent } from './mail-link/mail-link.component';

@NgModule({
  declarations: [
    LinkRecieveComponent,
    MailLinkComponent],
  imports: [
    CommonModule,
    MailLinkRoutingModule,
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
export class MailLinkModule { }
