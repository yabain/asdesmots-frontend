import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FormatDatePipe } from '../all-modules/arcarde/services/format-date.pipe';

@NgModule({
  declarations: [TruncatePipe, FormatDatePipe],
  imports: [CommonModule],
  exports: [TruncatePipe, FormatDatePipe],
})
export class SharedModule {}
