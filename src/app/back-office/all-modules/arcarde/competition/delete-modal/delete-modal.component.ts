import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SousCompetitionService } from '../services/sous-competition.service';

@Component({
  selector: 'app-delete-competition-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  @Input() competitionData: any;
  @Input() index: Number;
  @Output() deletedFeedback = new EventEmitter<boolean>();

  waiting: boolean = false;

  constructor(
    public sousCompetitionService: SousCompetitionService,
  ) { }

  ngOnInit(): void { }

  delete() {
    this.waiting = true;
    this.sousCompetitionService.deleteCompetition(this.competitionData._id).then(() => {
      this.waiting = false;
      this.deletedFeedback.emit(true);
      $(`#cancel-btn00-${this.competitionData._id}`).click();
    });
  }
}
