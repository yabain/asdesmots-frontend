import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageTemplateComponent } from './language/language.component';
import { ValidatorTemplateComponent } from './helpers/password/validator-template/validator-template.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [LanguageTemplateComponent, ValidatorTemplateComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [LanguageTemplateComponent, ValidatorTemplateComponent]
})
export class SharedModule { }
