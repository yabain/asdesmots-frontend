import { Component, OnInit } from '@angular/core';
import { GameplayService } from '../service/gameplay.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  activeTab: string = 'oncomming';

  constructor() { }

  ngOnInit(): void {
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
