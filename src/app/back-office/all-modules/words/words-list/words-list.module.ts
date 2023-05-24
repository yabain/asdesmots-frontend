import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WordsListRoutingModule } from './words-list-routing.module';
import { WordsListComponent } from './words-list.component';
import { DataTablesModule } from "angular-datatables";
import { TranslateModule } from '@ngx-translate/core';
import { UserDetailsModule } from 'src/app/back-office/shared/user-details/user-details.module';

@NgModule({
  declarations: [WordsListComponent],
  imports: [
    CommonModule,
    WordsListRoutingModule,ReactiveFormsModule,FormsModule,
    DataTablesModule,
    TranslateModule,
    UserDetailsModule
  ]
})
export class WordsListModule { }
