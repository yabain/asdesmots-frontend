import { Component, OnInit } from '@angular/core';
import { SousCompetitionService } from './services/sous-competition.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';

@Component({
  selector: 'app-undercompetition',
  templateUrl: './undercompetition.component.html',
  styleUrls: ['./undercompetition.component.css']
})
export class UndercompetitionComponent implements OnInit {
  sousCompetitionSelctedData: SousCompetion = new SousCompetion();

  constructor(public sousCompetion: SousCompetitionService) {
      this.sousCompetion.initFormControl();
   }

  ngOnInit(): void {
    console.log('under competion load');
  }

  refresh(){
      this.sousCompetion.loadAllCompetition();
  }

  doCreationCompetion(){
      console.log('t', this.sousCompetion.newUnderCompetionParam);
  }
}
