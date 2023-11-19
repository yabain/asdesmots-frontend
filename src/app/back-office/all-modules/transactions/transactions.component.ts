import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  constructor(
    public commonService: CommonServiceService
  ) {}

  ngOnInit(): void {
  }
}
