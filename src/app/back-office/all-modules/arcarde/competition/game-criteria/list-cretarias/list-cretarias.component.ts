import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { SousCompetitionService } from '../../services/sous-competition.service';
import { ActivatedRoute } from '@angular/router';
import { WinnigsCriterias } from 'src/app/shared/entities/winnigCriterias';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-cretarias-list',
  templateUrl: './list-cretarias.component.html',
  styleUrls: ['./list-cretarias.component.css'],
})
export class ListCretariasComponent implements OnInit {
  @Input() competitionId: string = '';

  listCriterias: WinnigsCriterias[] = [];
  choosenCriteria: WinnigsCriterias = new WinnigsCriterias();
  formAddCriteria: FormGroup;
  selectedCriteriaId: string = '';
  fetching: boolean = true;
  isCollapsed: { [key: number]: boolean } = {};

  constructor(
    public competitionSrv: SousCompetitionService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCompetitionCriteria();
  }

  getCompetitionCriteria() {
    this.competitionSrv
      .getCompetionWiningsCriteria(this.competitionId)
      .then((response: any) => {
        this.listCriterias = response.data;
        if (this.listCriterias) {
          this.listCriterias.forEach((_, index) => {
            this.isCollapsed[index] = true;
          });
        }
        this.fetching = false;
      })
      .catch((error) => {
        this.fetching = false;
        console.log(
          'Erreur lors de la tentative de recuperation de la liste de criteres : ' +
            error
        );
      });
  }

  selectCriteria(criteria: any) {
    this.choosenCriteria = criteria;
  }

  toggleCollapse(index: number) {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

  async doDelete() {
    const result = await this.competitionSrv.removeWinningCriteria(
      this.competitionId,
      this.selectedCriteriaId
    );
    if (result == true) await this.getCompetitionCriteria();
    this.changeDetectorRef.detectChanges();
  }

  updateList(newValue: string) {
    if (newValue) this.getCompetitionCriteria();
  }
}
