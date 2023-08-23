import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  currentRoute: string =' On coming';

  constructor() { }

  ngOnInit(): void {
  }

  setCurrentRoute(current: string ){
    this.currentRoute = current;
  }

  refresh(){

  }

}
