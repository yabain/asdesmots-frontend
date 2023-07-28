import { Component, OnInit } from '@angular/core';
import { SousCompetitionService } from '../services/sous-competition.service';
import { ActivatedRoute } from '@angular/router';
import { WinnigsCriterias } from 'src/app/shared/entities/winnigCriterias';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      private fb: FormBuilder
  ) { 
      this.getData();
  }

  ngOnInit(): void {

  }

  initForm(){
      this.formAddCriteria = this.fb.group({
          idCriteria: ['', Validators.required] 
      });
  }

  getData(){
      this.idCompetition = this.route.snapshot.params['id'];
      this.listCriterias = Array.from(this.competitionSrv.getData(this.idCompetition).gameWinnerCriterias);

      if(this.competitionSrv.listWinningCriterias.length == 0){
          this.competitionSrv.loadGameCriterias();
      }
  }

  addCriteria(){
      console.log('criteria id', this.formAddCriteria.value);
  }

  doDelete(){

  }

  reset(){

  }

}
