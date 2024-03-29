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
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { WordDetailsModule } from '../../shared/word-details/word-details.module';

@NgModule({
    declarations: [
        WordsComponent,
        WordsListComponent,
        AddWordsComponent,
        EditWordsComponent,
        SidemenuComponent
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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        WordDetailsModule
    ]
})
export class WordsModule {}
