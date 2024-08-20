import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SousCompetitionService } from '../../competition/services/sous-competition.service';

@Component({
  selector: 'app-competition-unsubscribe-modal',
  templateUrl: './unsubscribe-modal.component.html',
  styleUrls: ['./unsubscribe-modal.component.css'],
})
export class UnsubscribeModalComponent implements OnInit {
  @Input() subscriber: any;
  @Input() arcadeId: string;
  @Input() competitionId: string;
  @Input() index: Number;
  @Output() unsubscribedFeedback = new EventEmitter<boolean>();

  waiting: boolean = false;

  constructor(public sousCompetitionService: SousCompetitionService) {}

  ngOnInit(): void { }

  unsubscribe() {
    this.waiting = true;
    const data = {
      gameID: this.competitionId,
      arcadeID: this.arcadeId,
      playerID: this.subscriber._id,
    };
    this.sousCompetitionService.unsubscribePlayer(data).then(() => {
      this.waiting = false;
      this.unsubscribedFeedback.emit(true);
      $(`#cancel-btn00-${this.index}`).click();
    });
  }
}
