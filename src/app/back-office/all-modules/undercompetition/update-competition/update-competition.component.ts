import { TranslationService } from './../../../../shared/services/translation/language.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { ArcardeService } from '../../arcarde/services/arcarde.service';
import { SousCompetitionService } from '../services/sous-competition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { CompetitionResolver } from './parentCompetetion.resolver';
import { UndercompetitionComponent } from '../undercompetition.component';
import { event } from 'jquery';

@Component({
  selector: 'app-update-competition',
  templateUrl: './update-competition.component.html',
  styleUrls: ['./update-competition.component.css']
})
export class UpdateCompetitionComponent implements OnInit {
  sousCompetitionSelctedData: SousCompetion = new SousCompetion();
  idCompetition: string = '';
  formUpdate: FormGroup;
  parentID: string;
  parentIdString: string;
  parentCompetitionName: any;
  competitionResolve: SousCompetion;
  inputHidden: boolean = false;
  parentCompetitionId: string;
  selectedCompetition: SousCompetion;
  sousCompetition: SousCompetion = new SousCompetion;
  competitionBuilt: SousCompetion = new SousCompetion;



  constructor(public sousCompetion: SousCompetitionService,
              private translate: TranslateService,
              private translatiton: TranslationService,
              private route: ActivatedRoute,
              public router: Router,
              public level: LevelService,
              private fb: FormBuilder,
              public competitonResolver: CompetitionResolver,
              private location: Location,
              public arcardeSrv: ArcardeService
              ) {
      this.translate.use(this.translatiton.getCurrentLanguage());
      this.sousCompetion.loadListUnderCompetition(),
      this.getLevel();
   }

  ngOnInit(): void {
    this.sousCompetion.initFormUpdate();
    // Accéder aux données résolues via snapshot
    this.competitionResolve = this.route.snapshot.data.currentCompetition;
    console.log("compétition resolue: ", this.competitionResolve);
    if (this.competitionResolve && this.competitionResolve.parentCompetition) {
       this.inputHidden = true;
       this.parentCompetitionName = this.competitionResolve.parentCompetition.name;
       console.log("name of parentCmpetition: ", this.parentCompetitionName);
    } else {
      this.inputHidden = false;
      if(this.competitionResolve)
        this.competitionResolve.parentCompetition = '';
    }
    this.getID();
  }


  getID(){
      this.idCompetition = this.route.snapshot.params['id'];
      this.sousCompetitionSelctedData = this.sousCompetion.getData(this.idCompetition);
      this.sousCompetion.initUpdatingValues(this.sousCompetitionSelctedData);
  }

  // getID(){
  //   this.idCompetition = this.route.snapshot.params['id'];
  //   this.sousCompetitionSelctedData = this.sousCompetion.listUnderCompetitions.find(competition => competition._id === this.idCompetition);
  //   this.sousCompetion.initUpdatingValues(this.sousCompetitionSelctedData);
  // }

 async loadListOfArcarde(){
      if(this.arcardeSrv.listArcardeUser.length == 0){
          this.arcardeSrv.loadArcade();
      }
  }

  // initUpdatingForm(data: SousCompetion){
  //     this.sousCompetion.initUpdatingValues(this.sousCompetitionSelctedData);
  // }

  resetFormCreation(){
      this.sousCompetion.formUpdate.reset();
      this.router.navigateByUrl('/undercompetition/competition/list');
  }

  getLevel(){
      if(this.level.levelList.length === 0){
          this.level.getAllLevels();
      }
  }

  backClicked(){
        this.resetFormCreation();
        this.location.back();
  }

  // doUpdate(){
  //   console.log(this.parentCompetitionId);
  //     console.log("hey!");
  //     console.log("C'est l'id de la compétition à modifier: ",this.idCompetition);
  //     this.sousCompetion.update(this.idCompetition);
  // }

  buildCompetition(): SousCompetion {
    this.sousCompetition.name = this.sousCompetion.formUpdate.value.name;
    this.sousCompetition.description = this.sousCompetion.formUpdate.value.description;
    this.sousCompetition.gameLevel = this.sousCompetion.formUpdate.value.gameLevel;
    this.sousCompetition.isSinglePart = this.sousCompetion.formUpdate.value.isSinglePart;
    this.sousCompetition.canRegisterPlayer = this.sousCompetion.formUpdate.value.canRegisterPlayer;
    this.sousCompetition.localisation = this.sousCompetion.formUpdate.value.localisation;
    this.sousCompetition.maxPlayerLife = this.sousCompetion.formUpdate.value.maxPlayerLife;
    this.sousCompetition.maxTimeToPlay = this.sousCompetion.formUpdate.value.maxTimeToPlay;
    this.sousCompetition.startDate = this.sousCompetion.formUpdate.value.startDate;
    this.sousCompetition.endDate = this.sousCompetion.formUpdate.value.endDate;
    this.sousCompetition.maxOfWinners = this.sousCompetion.formUpdate.value.maxOfWinners;
    this.sousCompetition.lang = this.sousCompetion.formUpdate.value.lang;
    if ( this.selectedCompetition != undefined){
    this.sousCompetition.parentCompetition =  this.selectedCompetition._id;
    }
    return this.sousCompetition;
  }

  doUpdate() {
    this.competitionBuilt = this.buildCompetition();
    console.log("l'objet envoyé dans update:", this.competitionBuilt);
    this.sousCompetion.updateCompetition(this.idCompetition, this.competitionBuilt);
  }

  onCompetitionChange(event: any) {
    const competitionselectedId = event.target.value;
    this.selectedCompetition = this.arcardeSrv.listUnderCompetion.find(competition => competition._id === competitionselectedId);
    if (this.selectedCompetition) {
      console.log(this.selectedCompetition._id);
      console.log('Objet de la compétition sélectionnée :', this.selectedCompetition);
    } else {
      console.log('Aucune compétition sélectionnée');
    }
  }
  
  toggleCheckbox(control: string) {
    this.formUpdate.get(control)?.setValue(!this.formUpdate.get(control)?.value);
  }
}


