import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { SousCompetitionService } from '../services/sous-competition.service';
import { ActivatedRoute } from '@angular/router';
import { WinnigsCriterias } from 'src/app/shared/entities/winnigCriterias';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

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
  selectedCriteriaId: string = '';
  
  constructor(
      public competitionSrv: SousCompetitionService,
      private route:ActivatedRoute,
      private fb: FormBuilder,
      private toastr: ToastrService,
      private changeDetectorRef: ChangeDetectorRef
  ) { 
    this.initForm();
      this.getData();
      this.getCompetitionCriteria();
  }

  ngOnInit(): void {
    this.getCompetitionCriteria();
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
    await this.competitionSrv.getCompetionWiningsCriteria(this.idCompetition)
    .then((listCriteria) => {
      this.listCriterias = listCriteria;
      this.changeDetectorRef.detectChanges()
    })
    .catch((error) => {
      console.log('Erreur lors de la tentative de recuperation de la liste de criteres : '+ error);
    })
  }

  async addCriteria(){

      const modalDiv =  document.getElementById('addCriteria');
      console.log(this.formAddCriteria.get('idCriteria').value)
      const result = await this.competitionSrv.addCriteria(this.idCompetition, this.formAddCriteria.get('idCriteria').value);
    
      if (result === true) {
        modalDiv.classList.remove('show');
        modalDiv.setAttribute('aria-modal', 'false');
        modalDiv.style.display = 'none';
      }
    
      await this.getCompetitionCriteria();
      this.changeDetectorRef.detectChanges();
    
  }

  selectedCriteria(criteriaId: string){
    this.selectedCriteriaId = criteriaId;
  }

  async doDelete(){
    const result = await this.competitionSrv.removeWinningCriteria(this.idCompetition, this.selectedCriteriaId);
    if(result == true) await this.getCompetitionCriteria();
    this.changeDetectorRef.detectChanges();
    
    }

  reset(){

    }

}
