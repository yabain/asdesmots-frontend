import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditWordsComponent } from './edit-words.component';

const routes: Routes = [{ path: '', component: EditWordsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCustomerRoutingModule { }
