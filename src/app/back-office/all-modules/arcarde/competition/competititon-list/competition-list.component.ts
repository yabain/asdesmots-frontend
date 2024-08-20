import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SousCompetitionService } from '../services/sous-competition.service';

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
        this.competitions = response.data.children;
        this.fetching = false;
      })
      .catch((error) => {
        console.error(error);
        this.fetching = false;
      });
  }

  startGame(competitionId: string) {
    // Logique pour démarrer une compétition
  }

  deletedSubCompettitionFeedback(newValue: string) {
    if(newValue)
      this.getCompetitionsByArcade();
  }
}
