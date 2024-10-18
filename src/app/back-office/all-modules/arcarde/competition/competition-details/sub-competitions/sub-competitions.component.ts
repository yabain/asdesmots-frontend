import { Component, Input, OnInit } from '@angular/core';
import { SousCompetitionService } from '../../services/sous-competition.service';

@Component({
  selector: 'app-sub-competitions',
  templateUrl: './sub-competitions.component.html',
  styleUrls: ['./sub-competitions.component.css']
})
export class SubCompetitionsComponent implements OnInit {
  @Input() competitionId: string;

  competitions: any[] = [];
  fetching: boolean = true;

  constructor(private subCompetitionService: SousCompetitionService) { }

  ngOnInit(): void {
    this.getArcadeSubCompetitions();
  }

  getArcadeSubCompetitions() {
    this.subCompetitionService 
      .getArcadeCompetitionsWithChildren(this.competitionId)
      .then((response: any) => {
        this.competitions = response.data;
        this.fetching = false;
      })
      .catch((error) => {
        console.error(error);
        this.fetching = false;
      });
  }

}
