import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailVerificationComponent } from './email-verification.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProgressIndeterminateModule } from "../../../shared/elements/progress-indeterminate/progress-indeterminate.module";
import { EmailVerificationRoutingModule } from './email-verification-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [EmailVerificationComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        EmailVerificationRoutingModule,
        ProgressIndeterminateModule
    ]
})
export class EmailVerificationModule { }
