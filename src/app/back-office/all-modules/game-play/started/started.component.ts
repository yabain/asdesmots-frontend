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
import { GamePartsService } from '../../arcarde/competition/gane-parts/list-parts/service/game-parts.service';

@Component({
  selector: 'app-started',
  templateUrl: './started.component.html',
  styleUrls: ['./started.component.css'],
})
export class StartedComponent implements OnInit {
  competitionChoose: SousCompetion = new SousCompetion();
  fetching: boolean = true;
  placeholders = Array.from({ length: 12 }); // Crée un tableau de 8 éléments
  gameState = State;
  competitions: SousCompetion[] = [];

  constructor(
    public gameManager: GameManagerService,
    public gamePlay: GameplayService,
    public partService: GamePartsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.geCompetitions();
  }

  
  geCompetitions() {
    this.gamePlay
      .getPlayersRunningCompetitions()
      .then((response: any) => {
        // response.data?.forEach((competition) => {
        //   const parts = competition.gameParts.filter((part) => {
        //     return part.gameState === State.RUNNING || part.gameState === State.WAITING_PLAYER;
        //   });
        //   if (parts.length) {
        //     parts.forEach(part => {
        //       this.competitions.push({
        //         localisation: competition.localisation,
        //         competitionID: competition._id,
        //         ...part
        //       });
        //     });
        //   } else {
        //     this.competitions.push(competition);
        //   }
        // });
        this.competitions = response.data;
        this.fetching = false;
      })
      .catch((error) => {
        console.error(error);
        this.fetching = false;
      });
  }
  getIconClass(competition: any): string {
    if (competition.gameState === this.gameState.NO_START) {
      return 'fa fa-play';
    } else if (competition.gameState === this.gameState.RUNNING) {
      return 'fas fa-clock';
    } else if (competition.gameState === this.gameState.WAITING_PLAYER) {
      return 'fas fa-user-plus';
    } else if (competition.gameState === this.gameState.END) {
      return 'fas fa-stop';
    } else {
      return ''; // Classe par défaut si nécessaire
    }
  }

  waitingPlayersOrRunning(competition: SousCompetion) {
    return ((competition.gameState === this.gameState.WAITING_PLAYER) || (competition.gameState === this.gameState.RUNNING))
  }

  joinGame(competition: SousCompetion) {
    // if (competition.gameState === this.gameState.WAITING_PLAYER) {
      const userID = this.userService.getLocalStorageUser()._id;
      this.gameManager.joinGame({
        competitionID: competition._id,
        localisation: competition.localisation,
        playerID: userID,
      });
    // }
  }
}
