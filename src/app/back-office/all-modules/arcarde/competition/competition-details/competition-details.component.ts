import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { State } from 'src/app/shared/entities/state.enum';
import { WinnigsCriterias } from 'src/app/shared/entities/winnigCriterias';
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
  loading: boolean = true;
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
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      }
    );
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  goToAcradeSuscription() {
    this.router.navigateByUrl('/competition/suscribe');
  }

  subscribe() {
    this.subCompetitionService.subscribePlayer({gameId: this.competitionData._id}).then(() => {
      this.subCompetitionService.newSubscriptionDetectedSubject.next(true);
    });
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

  deletedFeedback(newValue: string) {
    if(newValue)
      this.router.navigate(['/arcarde/details',this.competitionData.arcadeId]);
  }
}
