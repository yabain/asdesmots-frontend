import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WordsComponent } from './words.component';
import { WordsRoutingModule } from './words-routing.module';
import { RouterModule } from '@angular/router';
import { WordsListComponent } from './words-list/words-list.component';
import { AddWordsComponent } from './add-words/add-words.component';
import { EditWordsComponent } from './edit-words/edit-words.component';
import { DataTablesModule } from "angular-datatables";
import { ProgressIndeterminateModule } from 'src/app/shared/elements/progress-indeterminate/progress-indeterminate.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { WordDetailsModule } from '../../shared/word-details/word-details.module';
import { SidemenuComponent } from "./sidemenu/sidemenu.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/shared/interceptor/error.interceptor';

@NgModule({
    declarations: [
        WordsComponent,
        WordsListComponent,
        AddWordsComponent,
        EditWordsComponent,
    ],
    imports: [
        CommonModule,
        WordsRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule,
        ModalModule.forRoot(),
        ProgressIndeterminateModule,
        TranslateModule,
        WordDetailsModule,
        SidemenuComponent
    ]
})
export class WordsModule {}
