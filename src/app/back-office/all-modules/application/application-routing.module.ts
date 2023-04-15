import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppComponent } from './add-app/add-app.component';
import { ApplicationComponent } from './application.component';
import { CalenderComponent } from './calender/calender.component';
import { ChatComponent } from './chat/chat.component';
import { EmailComponent } from './email/email.component';
import { MyAppListComponent } from './my-app-list/my-app-list.component';
import { MyAppComponent } from './my-app/my-app.component';

const routes: Routes = [
  {path:'',component:ApplicationComponent,
  children: [
    { path: "", component: MyAppComponent },
    { path: "chat", component: ChatComponent },
    { path: "my-app", component: MyAppComponent },
    { path: "my-app-list", component: MyAppListComponent },
    { path: "add-app", component: AddAppComponent },
    { path: "calender", component: CalenderComponent},
    { path: "email", component: EmailComponent},
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
