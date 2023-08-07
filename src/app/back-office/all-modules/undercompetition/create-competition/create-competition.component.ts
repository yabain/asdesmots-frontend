import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { ArcardeService } from '../../arcarde/services/arcarde.service';
import { SousCompetitionService } from '../services/sous-competition.service';

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
              private route: Router,
              public level: LevelService,
              public arcardeSrv: ArcardeService
              ) {

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
}
