import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { State } from 'src/app/shared/entities/state.enum';
import { WinnigsCriterias } from 'src/app/shared/entities/winnigCriterias';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { SousCompetitionService } from '../services/sous-competition.service';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css'],
})
export class CompetitionDetailsComponent implements OnInit {
  idCompetition: string = '';
  activeTab: string = 'overview';
  competitionData: any;
  subscribers: any = [];
  criterias: any = [];
  gameState = State;
  selectedCriteriaId: string = '';
  criteriaChooseData: WinnigsCriterias = new WinnigsCriterias();

  constructor(
    public subCompetitionService: SousCompetitionService,
    private toastr: ToastrService,
    private router: Router,
    private activedRouter: ActivatedRoute
  ) {
    this.idCompetition = this.activedRouter.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.subCompetitionService.getCompetitionById(this.idCompetition).then(
      (resp: any) => {
        this.competitionData = resp.data;
      },
      (error: any) => {}
    );
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  goToAcradeSuscription() {
    this.router.navigateByUrl('/competition/suscribe');
  }

  subscribe() {
    this.subCompetitionService.subscribePlayer({location: this.competitionData.location});
  }

  startCompetition() {
    this.competitionData.changeState({
      gameCompetitionID: this.competitionData._id,
      state: State.RUNNING,
    });
  }

  selectedCriteria(criteriaId: string) {
    this.selectedCriteriaId = criteriaId;
  }
}
