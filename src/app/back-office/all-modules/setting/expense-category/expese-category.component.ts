import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';

@Component({
  selector: 'app-expese-category',
  templateUrl: './expese-category.component.html',
  styleUrls: ['./expese-category.component.css'],
})
export class ExpeseCategoryComponent implements OnInit, OnDestroy {
  message:any
  text:any
  constructor(
    public router: Router,
    public commonSerivce: CommonServiceService
  ) {}

  ngOnInit(): void {
    this.commonSerivce.nextmessage('chat');
  }

  ngOnDestroy() {
    this.commonSerivce.nextmessage('');
  }

  send() {
    this.text = this.message;
    this.message = '';
  }
}
