import { Component, Input, OnInit } from '@angular/core';
import { ArcardeService } from '../../services/arcarde.service';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { UserService } from 'src/app/shared/services/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { SousCompetitionService } from '../../competition/services/sous-competition.service';

@Component({
  selector: 'app-arcade-suscribers',
  templateUrl: './arcade-suscribers.component.html',
  styleUrls: ['./arcade-suscribers.component.css'],
})
export class ArcadeSuscribersComponent implements OnInit {
  @Input() arcadeId: string;
  @Input() competitionId: string;
  
  arcardeData: Arcarde = new Arcarde();
  subscribers: any[] = [];
  fetching: boolean = true;

  constructor(
    public arcadeService: ArcardeService,
    public userService: UserService,
    private arcardeService: ArcardeService,
    private subCompetitionService: SousCompetitionService,
  ) {
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    if(this.arcadeId)
      this.getArcadeSubscribers();
    else 
      this.getCompetitionSubscribers()
  }

  getArcadeSubscribers() {
    this.arcadeService
      .getArcadeSubscribers(this.arcadeId)
      .then((response: any) => {
        this.subscribers = response.data;
        this.fetching = false;
      })
      .catch((error) => {
        console.error(error);
        this.fetching = false;
      });
  }

  getCompetitionSubscribers() {
    this.subCompetitionService
      .getCompetitionSubscribers(this.competitionId)
      .then((response: any) => {
        this.subscribers = response.data;
        this.fetching = false;
      })
      .catch((error) => {
        console.error(error);
        this.fetching = false;
      });
  }

  subscriptionFeedback(newValue: string) {
    if(newValue)
      this.initData();
  }
}
