import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPwdComponent } from './new-pwd.component';
import { NewPwdRoutingModule } from './new-pwd-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [NewPwdComponent],
    imports: [
        CommonModule,
        NewPwdRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        ProgressIndeterminateModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        SharedModule
    ]
})
export class NewPwdModule { }
