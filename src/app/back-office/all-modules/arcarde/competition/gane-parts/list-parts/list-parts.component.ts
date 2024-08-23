import { Component, Input, OnInit } from '@angular/core';
import { GamePartsService } from './service/game-parts.service';
import { GamePart } from 'src/app/shared/entities/gamePart.model';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { Level } from 'src/app/shared/entities/level';
import { SousCompetitionService } from '../../services/sous-competition.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { State } from 'src/app/shared/entities/state.enum';
import { GameplayService } from '../../../../game-play/service/gameplay.service';
import { GameManagerService } from '../../../../game-play/service/game-manager.service';
import { ArcardeService } from '../../../services/arcarde.service';

@Component({
  selector: 'app-game-list-parts',
  templateUrl: './list-parts.component.html',
  styleUrls: ['./list-parts.component.css'],
})
export class ListPartsComponent implements OnInit {
  @Input() competitionID: string;


  loading: boolean = true;
  parts = [];
  placeholders = Array.from({ length: 12 }); // Crée un tableau de 8 éléments

  competitionData: SousCompetion = new SousCompetion();

  gamePartData: GamePart = new GamePart();
  listLevel: Level[] = [];
  sousCompetion: SousCompetion = new SousCompetion();
  gameState = State;

  constructor(
    public gamePartSrv: GamePartsService,
    private subCompetitionService: SousCompetitionService,
    public level: LevelService,
    public gamePlay: GameplayService,
    public gameManager: GameManagerService,
    public partService: GamePartsService,
    public arcardeSrv: ArcardeService
  ) {}

  ngOnInit(): void {
    this.partService.partListChanged$.subscribe(
      (subscription) => {
        this.getListParts();
      }
    );
    this.getListParts();
    this.getLevel();
  }

  getListParts() {
    this.gamePartSrv.getListGamePart(this.competitionID).then((response: any) => {
      this.parts = response.data;
      this.loading = false;
    })
    .catch(error => {
      console.error(error);
      this.loading = false;
    });
  }

  getLevel() {
    if (this.level.levelList.length === 0) {
      this.level.getAllLevels();
    }
  }

  startGame(partID: any) {
    console.log(partID);
    this.gameManager.startGame({
      competitionID: this.competitionID,
      gamePartID: partID,
    });
  }
}
