import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service'
import * as $ from 'jquery';

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.css'],
})
export class ViewExpensesComponent implements OnInit {
  expeses: any = [];
  errorMessage: string;
  constructor(public commonService: DataService) {}

  ngOnInit(): void {
    this.getExpenses();
  }
  getExpenses() {    
      this.expeses = this.commonService.expenses;
  }

}
