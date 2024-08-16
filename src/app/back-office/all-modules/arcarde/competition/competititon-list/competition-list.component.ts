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

  // organiseCompetitions(competitionList) {
  //   let tempComps = [];
  //   competitionList?.forEach((comp) => {
  //     tempComps.push({ ...comp, children: [] }); // Crée une copie avec une liste de `children` vide
  //   });
  //   tempComps.forEach((parent) => {
  //     tempComps.forEach((child) => {
  //       if (
  //         child.parentCompetition &&
  //         child._id !== parent._id &&
  //         child.parentCompetition === parent._id
  //       ) {
  //         if (!parent.children.some((c) => c._id === child._id)) {
  //           parent.children.push(child);
  //         }
  //       }
  //     });
  //   });
  //   return tempComps;
  // }

  startGame(competitionId: string) {
    // Logique pour démarrer une compétition
  }
}
