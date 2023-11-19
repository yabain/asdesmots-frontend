import { Component, OnInit, ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-app-list',
  templateUrl: './my-app-list.component.html',
  styleUrls: ['./my-app-list.component.css']
})
export class MyAppListComponent implements OnInit {
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
