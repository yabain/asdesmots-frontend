import { Component, OnInit } from '@angular/core';
import { GameplayService } from '../service/gameplay.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  activeTab: string = 'oncomming';

  constructor(
      private gameplayService: GameplayService
  ) { 

    this.loadListCompetition();
  }

  ngOnInit(): void {
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  loadListCompetition(){
      if(this.gameplayService.listCompetitionOnComming.length == 0 || this.gameplayService.listCompetitionStart.length == 0){
          this.gameplayService.loadUserCompetition();
      }
  }
}
