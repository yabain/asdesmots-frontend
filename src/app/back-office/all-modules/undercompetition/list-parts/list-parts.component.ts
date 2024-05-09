import { Component, OnInit } from '@angular/core';
import { GamePartsService } from './service/game-parts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GamePart } from 'src/app/shared/entities/gamePart.model';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { Level } from 'src/app/shared/entities/level';
import { SousCompetitionService } from '../services/sous-competition.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { State } from 'src/app/shared/entities/state.enum';
import { GameplayService } from '../../game-play/service/gameplay.service';
import { GameManagerService } from '../../game-play/service/game-manager.service';
import { ArcardeService } from '../../arcarde/services/arcarde.service';


@Component({
  selector: 'app-list-parts',
  templateUrl: './list-parts.component.html',
  styleUrls: ['./list-parts.component.css']
})
export class ListPartsComponent implements OnInit {
  competitionID: string = '';
  competitionData: SousCompetion = new SousCompetion();

  partChooseData : GamePart = new GamePart();
  listLevel: Level[] = [];
  sousCompetion: SousCompetion = new SousCompetion;
  gameState = State;

  constructor(public gamePartSrv: GamePartsService,
              private route: ActivatedRoute,
              private SousCompetSrv: SousCompetitionService,
              public level: LevelService,
              public gamePlay: GameplayService,
              public gameManager: GameManagerService,
              public partService: GamePartsService,
              public arcardeSrv: ArcardeService,
             ) {
                this.gamePartSrv.dateNow = new Date();
                this.gamePartSrv.initForm();
                this.getListParts();
                this.getLevel();
             }

  ngOnInit(): void {
  }

  getListParts(){
    this.competitionID = this.route.snapshot.params['id'];
    this.competitionData = this.SousCompetSrv.getData(this.competitionID);
    this.gamePartSrv.f['gameCompetitionID'].setValue(this.competitionID);
    this.gamePartSrv.getListGamePart(this.competitionID);
  }

  addPart(){
    this.gamePartSrv.checkDateGamePartAndAddGamePart();
  }

  reset(){
      this.gamePartSrv.gamePartForm.reset();
      this.gamePartSrv.partDeletingDone = false;
      this.gamePartSrv.partAdded = false;
  }

  doDelete(){
      this.gamePartSrv.deleteGamePart({competitionID: this.competitionID, gamePartID: this.partChooseData._id});
  }

  getLevel(){
      if(this.level.levelList.length === 0){
          this.level.getAllLevels();
      }
  }

  async sartGame(competitionID: any) {
    await this.partService.getListGamePart(competitionID);
    // this.gamePartSrv.getListGamePart(this.competitionID);
    competitionID.gamePart = this.partService.listGameParts;
    console.log(competitionID.gamePart)
    let partState = this.gamePlay.getPart(competitionID);
    console.log(partState._id)
    this.gameManager.startGame({
      competitionID: competitionID._id,
      gamePartID:partState._id});
  }





  startCompetition(idCompetition: string){
    const id = this.arcardeSrv.getCompetitonArcardeID(idCompetition);

    this.SousCompetSrv.changeState({
      gameArcardeID : id,
      gameCompetitionID: idCompetition,
      state: State.RUNNING
    });

}

}
