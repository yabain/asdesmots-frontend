import { Component, Input, OnInit } from '@angular/core';
import { SousCompetitionService } from '../services/sous-competition.service';

@Component({
  selector: 'app-competiton-tree',
  templateUrl: './competiton-tree.component.html',
  styleUrls: ['./competiton-tree.component.css']
})
export class CompetitonTreeComponent implements OnInit {
  @Input() arcadeId: string;
  
  fetching: boolean = true;
  competitions: any[] = [];

  constructor(private subCompetitionService: SousCompetitionService) { }

  ngOnInit(): void {
    this.getCompetitionsByArcade(this.arcadeId)
  }

  
  getCompetitionsByArcade(arcadeId: string) {
    this.subCompetitionService
      .getArcadeCompetitions(arcadeId)
      .then((response: any) => {
        this.competitions.push(response.data);
        this.fetching = false;
      })
      .catch((error) => {
        console.error(error);
        this.fetching = false;
      });
  }

}
