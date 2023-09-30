import { Component, OnInit } from '@angular/core';
import { GameplayService } from '../service/gameplay.service';
import { GameManagerService } from '../service/game-manager.service';

@Component({
  selector: 'app-oncomming',
  templateUrl: './oncomming.component.html',
  styleUrls: ['./oncomming.component.css']
})
export class OncommingComponent implements OnInit {

  constructor( public gamePlay: GameplayService,
               private gameManager: GameManagerService
              ) {
                  this.initConnection();
               }

  ngOnInit(): void {
  }

  initConnection(){
    this.gameManager.initConnection();
  }

}
