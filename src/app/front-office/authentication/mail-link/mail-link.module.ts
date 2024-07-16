import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';
import { MailLinkRoutingModule } from './mail-link-routing.module';
import { LinkReceiveComponent } from './link-receive/link-receive.component';
import { MailLinkComponent } from './mail-link/mail-link.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [
        LinkReceiveComponent,
        MailLinkComponent
    ],
    imports: [
        CommonModule,
        MailLinkRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        ProgressIndeterminateModule,
        TranslateModule,
        SharedModule
    ]
})
export class MailLinkModule { }
