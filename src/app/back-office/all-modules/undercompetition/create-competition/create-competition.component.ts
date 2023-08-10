import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { ArcardeService } from '../../arcarde/services/arcarde.service';
import { SousCompetitionService } from '../services/sous-competition.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.css']
})
export class CreateCompetitionComponent implements OnInit {
  sousCompetitionSelctedData: SousCompetion = new SousCompetion();
  id_Arcarde : string = ''; //id arcade of the new register competion;
  formIdArcarde!: FormGroup;
  constructor(public sousCompetion: SousCompetitionService, 
              private fb: FormBuilder,
              private translate: TranslateService,
              private translation: TranslationService,
              private route: Router,
              public level: LevelService,
              private location: Location,
              public arcardeSrv: ArcardeService
              ) {
      this.translate.use(this.translation.getLanguage());
      this.loadListOfArcarde();
      this.sousCompetion.initFormControl();
      this.sousCompetion.initFormUpdate();
      this.initArcardeFormID();
      this.getLevel();
   }

  ngOnInit(): void {

  }

  initArcardeFormID(){
     this.formIdArcarde = this.fb.group({
        idArcarde: ['', Validators.required]
    });
    
    this.formIdArcarde.valueChanges.subscribe((idChoossed)=>{
        this.id_Arcarde = idChoossed;
        this.sousCompetion.buildListParentCompetition(idChoossed.idArcarde);
    });
  }

  doCreationCompetion(){
      this.sousCompetion.createCompetition(this.sousCompetion.newUnderCompetionParam, this.id_Arcarde);
  }

  resetFormCreation(){
    this.sousCompetion.form.reset();
    this.sousCompetion.creationDone = false;
    this.route.navigateByUrl('/undercompetition/competition/list')
  }

  async loadListOfArcarde(){
    if(this.arcardeSrv.listArcardeUser.length == 0){
        this.arcardeSrv.loadArcade();
    }
    this.sousCompetion.loadListUnderCompetition();
  }

  getLevel(){
      if(this.level.levelList.length === 0){
          this.level.getAllLevels();
      }
  }

  backClicked(){
    this.location.back();
  }
}
