import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgBmisDateTimePickerComponent } from './ng-bmis-date-time-picker/ng-bmis-date-time-picker.component';



@NgModule({
  declarations: [
    NgBmisDateTimePickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgBmisDateTimePickerComponent
  ]
})
export class NgBmisDateTimePickerModule { }
