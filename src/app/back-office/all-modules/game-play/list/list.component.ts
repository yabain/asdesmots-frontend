import { Component, OnInit } from '@angular/core';
import { GameplayService } from '../service/gameplay.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  currentRoute: string =' On coming';

  constructor(
      private gameplayService: GameplayService
  ) { 

    this.loadListCompetition();
  }

  ngOnInit(): void {
  }

  setCurrentRoute(current: string ){
    this.currentRoute = current;
  }

  refresh(){
      this.gameplayService.loadUserCompetition();
  }

  loadListCompetition(){
      if(this.gameplayService.listCompetitionOnComming.length == 0 || this.gameplayService.listCompetitionStart.length == 0){
          this.gameplayService.loadUserCompetition();
      }
  }
}
