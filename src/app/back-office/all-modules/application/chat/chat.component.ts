import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  blogs: any = [];
  constructor(public commonService: CommonServiceService) {}

  ngOnInit(): void {
  }
}
