import { Component, Input, OnInit } from '@angular/core';
import { SousCompetitionService } from '../../undercompetition/services/sous-competition.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-arcade-competititon',
  templateUrl: './competititon.component.html',
  styleUrls: ['./competititon.component.css'],
})
export class CompetititonComponent implements OnInit {
  @Input() competition: any;
  @Input() arcadeId: string;

  fetching: boolean = true;

  competitions: any[] = [];

  constructor(
    private sousCompetitionService: SousCompetitionService,
    private activatedRoute: ActivatedRoute
  ) {
    // this.arcadeId = this.activatedRoute.snapshot.paramMap.get('arcadeId');
    this.getCompetiotions();
  }

  ngOnInit() { }

  getCompetiotions() {
    this.sousCompetitionService
      .getAllCompettions(this.arcadeId)
      .then((response: any) => {
        this.competitions = this.organiseCompetitions(response.data);
        this.fetching = false;
      })
      .catch((error) => {
        console.error(error);
        this.fetching = false;
      });
  }

  organiseCompetitions(competitionList) {
    let tempComps = [];
    competitionList?.forEach((comp) => {
      tempComps.push({ ...comp, children: [] }); // Crée une copie avec une liste de `children` vide
    });
    tempComps.forEach((parent) => {
      tempComps.forEach((child) => {
        if (
          child.parentCompetition &&
          child._id !== parent._id &&
          child.parentCompetition === parent._id
        ) {
          if (!parent.children.some((c) => c._id === child._id)) {
            parent.children.push(child);
          }
        }
      });
    });
    return tempComps;
  }

  startGame(competitionId: string) {
    // Logique pour démarrer une compétition
  }
}
