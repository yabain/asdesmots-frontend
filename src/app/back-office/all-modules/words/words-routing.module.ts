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
      { path: 'words-list/:id', component: WordsListComponent },
      { path: "words-list", component: WordsListComponent },
      { path: "add-word", component: AddWordsComponent},
      { path: "edit-words", component: EditWordsComponent},
      { path: "add-category", component: AddWordsComponent},
    ]
  },
  { path: '**', redirectTo: '"words-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordsRoutingModule {}
