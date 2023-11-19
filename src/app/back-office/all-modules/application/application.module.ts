import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { RouterModule } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { ChatComponent } from './chat/chat.component';
import { CalenderComponent } from './calender/calender.component';
import { MyAppComponent } from './my-app/my-app.component';
import { AddAppComponent } from './add-app/add-app.component';
import { MyAppListComponent } from './my-app-list/my-app-list.component';


@NgModule({
  declarations: [
    ApplicationComponent,
    EmailComponent,
    ChatComponent,
    CalenderComponent,
    MyAppComponent,
    AddAppComponent,
    MyAppListComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    RouterModule
  ]
})
export class ApplicationModule { }
