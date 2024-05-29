import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageTemplateComponent } from './language/language.component';



@NgModule({
  declarations: [LanguageTemplateComponent],
  imports: [
    CommonModule
  ],
  exports: [LanguageTemplateComponent]
})
export class SharedModule { }
