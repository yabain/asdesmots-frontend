import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWordsComponent } from './add-words/add-words.component';
import { EditWordsComponent } from './edit-words/edit-words.component';
import { WordsListComponent } from './words-list/words-list.component';
import { WordsComponent } from './words.component';

const routes: Routes = [
  {
    path: '',
    component: WordsComponent,
    children: [
      { path: "words-list", component: WordsListComponent },
      { path: "add-words", component: AddWordsComponent},
      { path: "edit-words", component: EditWordsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordsRoutingModule {}
