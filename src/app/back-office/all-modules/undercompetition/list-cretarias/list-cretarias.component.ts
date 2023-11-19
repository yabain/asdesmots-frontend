import { Component, OnInit } from '@angular/core';
import { SousCompetitionService } from '../services/sous-competition.service';
import { ActivatedRoute } from '@angular/router';
import { WinnigsCriterias } from 'src/app/shared/entities/winnigCriterias';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-list-cretarias',
  templateUrl: './list-cretarias.component.html',
  styleUrls: ['./list-cretarias.component.css']
})
export class ListCretariasComponent implements OnInit {
  idCompetition: string = '';
  listCriterias : WinnigsCriterias[] = [];
  criteriaChooseData: WinnigsCriterias = new WinnigsCriterias();
  formAddCriteria: FormGroup;
  
  constructor(
      public competitionSrv: SousCompetitionService,
      private route:ActivatedRoute,
      private fb: FormBuilder,
      private location: Location,
      private translateService: TranslateService,
      private translation: TranslationService
  ) { 
    this.initForm();
      this.getData();
      this.getCompetitionCriteria();
  }

  ngOnInit(): void {
    this.translateService.use(this.translation.getLanguage());
  }

  initForm(){
      this.formAddCriteria = this.fb.group({
          idCriteria: ['', Validators.required] 
      });
  }

  getData(){
    if(this.competitionSrv.listWinningCriterias.length == 0){
        this.competitionSrv.loadGameCriterias();
    }
      this.idCompetition = this.route.snapshot.params['id'];
  }

  async getCompetitionCriteria(){
     this.listCriterias = await this.competitionSrv.getCompetionWiningsCriteria(this.idCompetition);
  }

  addCriteria(){
      this.competitionSrv.addCriteria(this.idCompetition, [this.formAddCriteria.get('idCriteria').value]);
  }

  doDelete(){
    this.competitionSrv.removeWinningCriteria(this.idCompetition, [this.formAddCriteria.get('idCriteria').value]);
  }

  reset(){

    }

    backClicked(){
        this.location.back();
    }
}
