import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { ArcardeService } from '../../arcarde/services/arcarde.service';
import { SousCompetitionService } from '../services/sous-competition.service';
import { Router } from '@angular/router';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { TranslateService } from '@ngx-translate/core';
import { State } from 'src/app/shared/entities/state.enum';
import { GameplayService } from '../../game-play/service/gameplay.service';
import { GameManagerService } from '../../game-play/service/game-manager.service';
import { GamePartsService } from '../list-parts/service/game-parts.service';

@Component({
  selector: 'app-list-competition',
  templateUrl: './list-competition.component.html',
  styleUrls: ['./list-competition.component.css']
})
export class ListCompetitionComponent implements OnInit {

  sousCompetitionSelctedData: SousCompetion = new SousCompetion();
  id_Arcarde : string = ''; //id arcade of the new register competion;
  formIdArcarde!: FormGroup;
  gameState = State;
  userID: string = '';

  constructor(public sousCompetion: SousCompetitionService,
              private translate: TranslateService,
              private translataion: TranslationService,
              private fb: FormBuilder,
              private route: Router,
              public level: LevelService,
              public arcardeSrv: ArcardeService,
              public gamePlay: GameplayService,
              public gameManager: GameManagerService,
              public partService: GamePartsService
              ) {
      this.translate.use(this.translataion.getLanguage());
      this.loadListOfArcarde();
   }

  ngOnInit(): void {
      this.loadUserID();
  }


 async loadListOfArcarde(){
      if(this.arcardeSrv.listArcardeUser.length == 0){
          this.arcardeSrv.loadArcade();
      }
      this.sousCompetion.loadListUnderCompetition();
  }

  initUpdatingForm(sousCompet: SousCompetion){
      this.route.navigateByUrl('/undercompetition/competition/update/'+sousCompet._id);
  }

  refresh(){
    /*
        --refresh the list of arcarde for the current user include event the
          refresh the undercompetition list
    */
    this.arcardeSrv.loadArcade();
  }

  loadUserID(){
        this.userID = JSON.parse(localStorage.getItem('user-data'))._id;
  }

  doDelete(){

  }

  goToPartsList(id: string){
      this.route.navigateByUrl('/undercompetition/competition/parts/'+id);
  }

   goToCriteriasList(id: string){
      this.route.navigateByUrl('/undercompetition/competition/criterias/'+id);
  }

  startCompetition(idCompetition: string){
        const id = this.arcardeSrv.getCompetitonArcardeID(idCompetition);

        this.sousCompetion.changeState({
          gameArcardeID : id,
          gameCompetitionID: idCompetition,
          state: State.RUNNING
        });

  }

  async sartGame(competitionID: any) { 
    await this.partService.getListGamePart(competitionID._id);
    competitionID.gamePart = this.partService.listGameParts;
    console.log(competitionID.gamePart)
    let partState = this.gamePlay.getPart(competitionID);
    console.log(partState._id)
    this.gameManager.startGame({
      competitionID: competitionID._id,
      gamePartID:partState._id});
  }

  listSuscriberCompetition(sousCompetion: any) {

  }
}
