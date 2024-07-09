import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';
import { FooterRoutingModule } from './footer-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';

@NgModule({
  declarations: [
    FooterComponent
],
imports: [
  CommonModule,
  RouterModule,
  // FooterRoutingModule,
  TranslateModule
],
exports: [FooterComponent]
})
export class FooterModule { }
