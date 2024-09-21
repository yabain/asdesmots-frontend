import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SousCompetitionService } from '../../services/sous-competition.service';

@Component({
  selector: 'app-apply-citeria-modal',
  templateUrl: './apply-citeria-modal.component.html',
  styleUrls: ['./apply-citeria-modal.component.css'],
})
export class ApplyCiteriaModalComponent implements OnInit {
  @Input() competitionId;
  @Input() competitionCriterias;
  @Output() appliedCriteriasFeedback = new EventEmitter<boolean>();

  criterias = [];
  selectedCriterias = [];
  fetching: boolean = true;
  submitted: boolean = false;
  invalid: boolean = false;
  saving: boolean = false;

  constructor(
    public subCompetitionService: SousCompetitionService,
  ) {}

  ngOnInit(): void {
    this.getCriterias();
    this.competitionCriterias.forEach(criteria => {
      this.selectedCriterias.push(criteria._id) 
    });
  }

  getCriterias() {
    this.subCompetitionService
      .getCriterias()
      .then((response: any) => {
        this.criterias = response.data;
        this.fetching = false;
      })
      .catch((error) => {
        console.error(error);
        this.fetching = false;
      });
  }

  competitionCriteriasInclude(criteriaId: string) {
    return this.selectedCriterias.findIndex(
      (criteria) => criteria === criteriaId
    );
  }
  updateCompetitionCriterias(event: any, criteriaId: string) {
    const index = this.competitionCriteriasInclude(criteriaId);
    if (event.target.checked && index === -1) {
      this.selectedCriterias.push(criteriaId);
    } else {
      this.selectedCriterias.splice(index, 1);
    }
  }

  saveCriterias() {
    console.log('submitting data', this.selectedCriterias);
    this.submitted = true;
    if (!this.selectedCriterias.length) {
      this.invalid = true;
      return;
    }

    const data = {
      gameID: this.competitionId,
      gammeWinnersID: this.selectedCriterias,
    };
    this.saving = true;
    this.subCompetitionService
      .applyCriterias(data)
      .then(() => {
        this.submitted = false;
        this.saving = false;
        this.invalid = false;
        this.appliedCriteriasFeedback.emit(true);
        $(`#cancel-btn00-${this.competitionId}`).click();
      })
      .catch((error) => {
        this.submitted = false;
        this.invalid = false;
        this.saving = false;
      });
  }
}
