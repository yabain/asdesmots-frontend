import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { State } from 'src/app/shared/entities/state.enum';
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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.arcadeId = this.activatedRoute.snapshot.paramMap.get('arcadeId');
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
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
  
  changeState() {
    this.arcardeData.updatingState = true;
    this.arcardeServ.changeState({
      gameArcardeID: this.arcardeData._id,
      state: (this.arcardeData.gameState == State.NO_START) ? State.RUNNING: State.END,
    }).then(() => {
      this.arcardeData.updatingState = false;
      this.arcardeData.gameState = (this.arcardeData.gameState == State.NO_START) ? State.RUNNING: State.END;
    }, (err) => {
      this.arcardeData.updatingState = false;
    });
  }
  
  updateArcadeCompetitionId(newValue: string, control) {
    this.arcadeCompetitionId = newValue;
  }

  deletedFeedback(newValue: string) {
    if(newValue)
     this.router.navigate(['/arcarde/list-arcarde']);
  }
}
