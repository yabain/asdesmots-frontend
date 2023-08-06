import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { ArcardeService } from '../../arcarde/services/arcarde.service';
import { SousCompetitionService } from '../services/sous-competition.service';
import { Router } from '@angular/router';
import { LevelService } from 'src/app/shared/services/level/level.service';

@Component({
  selector: 'app-list-competition',
  templateUrl: './list-competition.component.html',
  styleUrls: ['./list-competition.component.css']
})
export class ListCompetitionComponent implements OnInit {
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

  doCreationCompetion(){
    
      this.sousCompetion.createCompetition(this.sousCompetion.newUnderCompetionParam, this.id_Arcarde);
  }

  resetFormCreation(){
      this.sousCompetion.form.reset();
      this.sousCompetion.creationDone = false;
  }

  goToPartsList(id: string){
      this.route.navigateByUrl('/undercompetition/competition/parts/'+id);
  }

   goToCriteriasList(id: string){
      this.route.navigateByUrl('/undercompetition/competition/criterias/'+id);
  }
   getLevel(){
      if(this.level.levelList.length === 0){
          this.level.getAllLevels();
      }
  }
}