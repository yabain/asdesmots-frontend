import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { ArcardeService } from '../../arcarde/services/arcarde.service';
import { SousCompetitionService } from '../services/sous-competition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from 'src/app/shared/services/level/level.service';

@Component({
  selector: 'app-update-competition',
  templateUrl: './update-competition.component.html',
  styleUrls: ['./update-competition.component.css']
})
export class UpdateCompetitionComponent implements OnInit {
  sousCompetitionSelctedData: SousCompetion = new SousCompetion();
  idCompetition: string = '';
  formUpdate: FormGroup;

  constructor(public sousCompetion: SousCompetitionService, 
              private route: ActivatedRoute, 
              public router: Router,
              public level: LevelService,
              private fb: FormBuilder,
              public arcardeSrv: ArcardeService
              ) {
      this.sousCompetion.loadListUnderCompetition(),
      this.sousCompetion.initFormUpdate();

      this.getID();
      this.getLevel();
   }

  ngOnInit(): void {

  }

  getID(){
      this.idCompetition = this.route.snapshot.params['id'];
      this.sousCompetitionSelctedData = this.sousCompetion.getData(this.idCompetition);
      this.initUpdatingForm(this.sousCompetitionSelctedData);
    }

 async loadListOfArcarde(){
      if(this.arcardeSrv.listArcardeUser.length == 0){
          this.arcardeSrv.loadArcade();
      }
  }

  initUpdatingForm(data: SousCompetion){
      this.sousCompetion.initUpdatingValues(this.sousCompetitionSelctedData);
  }

  
  resetFormCreation(){
      this.sousCompetion.formUpdate.reset();
      this.router.navigateByUrl('/undercompetition/competition/list');
  }

  getLevel(){
      if(this.level.levelList.length === 0){
          this.level.getAllLevels();
      }
  }

  doUpdate(){
      this.sousCompetion.update(this.idCompetition);
  }
}