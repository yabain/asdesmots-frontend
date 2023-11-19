import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ ],
  imports: [CommonModule, ChatRoutingModule,RouterModule],
})
export class ChatModule {}
