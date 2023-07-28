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
    this.initForm();
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
    if(this.competitionSrv.listWinningCriterias.length == 0){
        this.competitionSrv.loadGameCriterias();
    }
      this.idCompetition = this.route.snapshot.params['id'];
      this.listCriterias = this.competitionSrv.getData(this.idCompetition).gameWinnerCriterias;

     
  }

  addCriteria(){
      this.competitionSrv.addCriteria(this.idCompetition, [this.formAddCriteria.get('idCriteria').value]);
  }

  doDelete(){

  }

  reset(){

  }

}
