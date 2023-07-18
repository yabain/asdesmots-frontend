import { Component, OnInit } from '@angular/core';
import { SousCompetitionService } from './services/sous-competition.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArcardeService } from '../arcarde/services/arcarde.service';

@Component({
  selector: 'app-undercompetition',
  templateUrl: './undercompetition.component.html',
  styleUrls: ['./undercompetition.component.css']
})
export class UndercompetitionComponent implements OnInit {
  sousCompetitionSelctedData: SousCompetion = new SousCompetion();
  id_Arcarde : string = ''; //id arcade of the new register competion;
    formIdArcarde!: FormGroup;
  constructor(public sousCompetion: SousCompetitionService, 
              private fb: FormBuilder,
              public arcardeSrv: ArcardeService
              ) {

      this.loadListOfArcarde();
      this.sousCompetion.initFormControl();
      this.initArcardeFormID();
   }

  ngOnInit(): void {
    console.log('under competion load');
  }

  initArcardeFormID(){
     this.formIdArcarde = this.fb.group({
        idArcarde: ['', Validators.required]
    });
    
    this.formIdArcarde.valueChanges.subscribe((idChoossed)=>{
        this.id_Arcarde = idChoossed;
    });
  }

 async loadListOfArcarde(){
      if(this.arcardeSrv.listAllArcarde.length == 0){
          this.arcardeSrv.loadAllArcarde();
      }
  }

  refresh(){
      this.sousCompetion.loadAllCompetition();
  }

  doCreationCompetion(){
      console.log('idArcarde', this.id_Arcarde);
      console.log('t', this.sousCompetion.newUnderCompetionParam);
      this.sousCompetion.createCompetition(this.sousCompetion.newUnderCompetionParam, this.id_Arcarde);
  }

  resetFormCreation(){
      this.sousCompetion.form.reset();
      this.sousCompetion.creationDone = false;
  }
}
