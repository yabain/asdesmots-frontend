import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SousCompetitionService } from '../services/sous-competition.service';
import { State } from 'src/app/shared/entities/state.enum';

@Component({
  selector: 'app-competititon-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css'],
})
export class CompetitionlistComponent implements OnInit {

  @Output() updateArcadeCompetitionId = new EventEmitter<string>();
  @Input() competition: any;
  @Input() arcadeId: string;

  fetching: boolean = true;

  competitions: any[] = [];

  constructor(
    private sousCompetitionService: SousCompetitionService,
  ) {
  }

  ngOnInit() {
    if(this.arcadeId)
      this.getCompetitionsByArcade(); 
  }

  getCompetitionsByArcade() {
    this.sousCompetitionService
      .getArcadeCompetitions(this.arcadeId)
      .then((response: any) => {
        this.updateArcadeCompetitionId.emit(response.data._id);
        this.competitions.push(response.data);
        this.fetching = false;
      })
      .catch((error) => {
        console.error(error);
        this.fetching = false;
      });
  }

  deletedSubCompettitionFeedback(newValue: string) {
    if(newValue)
      this.getCompetitionsByArcade();
  }
}
