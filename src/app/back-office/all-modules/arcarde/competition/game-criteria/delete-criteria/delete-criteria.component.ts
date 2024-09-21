import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SousCompetitionService } from '../../services/sous-competition.service';

@Component({
  selector: 'app-delete-criteria',
  templateUrl: './delete-criteria.component.html',
  styleUrls: ['./delete-criteria.component.css']
})
export class DeleteCriteriaComponent implements OnInit {
  
  @Input() competitionId;
  @Input() choosenCriteria;
  @Output() deletedCriteriasFeedback = new EventEmitter<boolean>();

  fetching: boolean = false;

  constructor(
    public subCompetitionService: SousCompetitionService
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.fetching = true;
    this.subCompetitionService
      .removeWinningCriteria(this.competitionId, this.choosenCriteria._id)
      .then(() => {
        this.fetching = false;
        this.deletedCriteriasFeedback.emit(true);
        $(`#cancel-btn00-${this.choosenCriteria._id}`).click();
      })
      .catch((error) => {
        this.fetching = false;
      });
  }

}
