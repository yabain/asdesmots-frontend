import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service'

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.css']
})
export class ExpensesListComponent implements OnInit {
  expeses: any = [];
  errorMessage: any;
  url: any = "expenses";
  public tempId: any;

  constructor(public commonService: DataService) { }

  ngOnInit(): void {
    this.getExpenses();
  }
  getExpenses() {
    this.expeses = this.commonService.expenses;
  }
}
