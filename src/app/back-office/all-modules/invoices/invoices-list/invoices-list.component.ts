import { Component, OnInit, ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent implements OnInit {
  select_box_open:any = []

  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    Feather.replace();
  }

  // Checkbox Select

  public openBox(val: any): void {

    if (this.select_box_open[0] != val) {
      this.select_box_open[0] = val;
      ;
    } else {
      this.select_box_open = []
    }
  }
}
