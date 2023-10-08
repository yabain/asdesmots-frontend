import { GameManagerService } from './../service/game-manager.service';
import { TranslationService } from './../../../../shared/services/translation/language.service';
import { Component, OnInit } from '@angular/core';
import { GameplayService } from '../service/gameplay.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { SpeakService } from 'src/app/shared/services/speak/speak.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { State } from 'src/app/shared/entities/state.enum';

@Component({
  selector: 'app-started',
  templateUrl: './started.component.html',
  styleUrls: ['./started.component.css']
})
export class StartedComponent implements OnInit {
  competitionChoose: SousCompetion = new SousCompetion();
  showGoodMsg: boolean = false;
  state = State;

  constructor( public gamePlay: GameplayService,
               private translate: TranslateService,
               private translation: TranslationService,
               private speakService: SpeakService,
               private userService: UserService,
               public gameManager: GameManagerService
       ) { 
        this.initConenction();
        this.gameManager.initForm();
       }

  ngOnInit(): void {
    this.translate.use(this.translation.getLanguage());
  }

  speak(word: string){
      this.speakService.speak(word, 'fr');
  }


  initConenction(){
    this.gameManager.initConnection();
  }

  joinGame(competitionID: string, localisation: string){
      const userID = this.userService.getLocalStorageUser()._id;
      this.gameManager.joinGame({
          competitionID: competitionID,
          playerID: userID,
          localisation: localisation
      });
  }

  sendWord(){
    this.gameManager.sendWord({
        playerID: this.userService.getLocalStorageUser()._id
    });
  }

  Quit(){

  }
}
