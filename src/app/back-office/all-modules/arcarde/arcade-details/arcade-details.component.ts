import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { State } from 'src/app/shared/entities/state.enum';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { ArcardeService } from '../services/arcarde.service';

@Component({
  selector: 'app-arcade-details',
  templateUrl: './arcade-details.component.html',
  styleUrls: ['./arcade-details.component.css'],
})
export class ArcadeDetailsComponent implements OnInit {
  arcadeId: string = '';
  arcadeCompetitionId: string;
  gameState = State;
  activeTab: string = 'overview';
  arcardeData: any = new Arcarde();
  loading: boolean = true;

  constructor(
    public arcardeServ: ArcardeService,
    private translate: TranslateService,
    private translation: TranslationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.arcadeId = this.activatedRoute.snapshot.paramMap.get('arcadeId');
  }

  ngOnInit(): void {
    this.arcardeServ
      .getArcardeById(this.arcadeId)
      .then((resp: any) => {
        this.arcardeData = resp.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
      });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  
  startCompetition() {}
  
  updateArcadeCompetitionId(newValue: string, control) {
    this.arcadeCompetitionId = newValue;
  }

  deletedFeedback(newValue: string) {
    if(newValue)
     this.router.navigate(['/arcarde/list-arcarde']);
  }
}
