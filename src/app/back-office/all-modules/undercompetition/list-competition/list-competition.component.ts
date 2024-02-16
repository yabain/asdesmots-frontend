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

@Component({
  selector: 'app-list-competition',
  templateUrl: './list-competition.component.html',
  styleUrls: ['./list-competition.component.css'],
})
export class ListCompetitionComponent implements OnInit {
  sousCompetitionSelctedData: SousCompetion = new SousCompetion();
  id_Arcarde: string = ''; //id arcade of the new register competion;
  formIdArcarde!: FormGroup;
  gameState = State;
  userID: string = '';

  constructor(
    public sousCompetion: SousCompetitionService,
    private translate: TranslateService,
    private translataion: TranslationService,
    private fb: FormBuilder,
    private route: Router,
    public level: LevelService,
    public arcardeSrv: ArcardeService
  ) {
    this.translate.use(this.translataion.getLanguage());
    this.loadListOfArcarde();
  }

  ngOnInit(): void {
    this.loadUserID();
  }

  async loadListOfArcarde() {
    if (this.arcardeSrv.listArcardeUser.length == 0) {
      this.arcardeSrv.loadArcade();
    }
    this.sousCompetion.loadListUnderCompetition();
  }

  initUpdatingForm(sousCompet: SousCompetion) {
    this.route.navigateByUrl(
      '/undercompetition/competition/update/' + sousCompet._id
    );
  }

  refresh() {
    /*
        --refresh the list of arcarde for the current user include event the 
          refresh the undercompetition list
    */
    this.arcardeSrv.loadArcade();
  }

  loadUserID() {
    this.userID = JSON.parse(localStorage.getItem('user-data'))._id;
  }

  doDelete() {}

  goToPartsList(id: string) {
    this.route.navigateByUrl('/undercompetition/competition/parts/' + id);
  }

  goToCriteriasList(id: string) {
    this.route.navigateByUrl('/undercompetition/competition/criterias/' + id);
  }

  startCompetition(idCompetition: string) {
    const id = this.arcardeSrv.getCompetitonArcardeID(idCompetition);

    this.sousCompetion.changeState({
      gameArcardeID: id,
      gameCompetitionID: idCompetition,
      state: State.WAITING_PLAYER,
    });
  }
}
