import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { State } from 'src/app/shared/entities/state.enum';
import { SousCompetitionService } from '../../services/sous-competition.service';


export interface Competition{
  name: string;
  gameState: string,
  parentCompetition: string,
  children: [Competition]
}

@Component({
  selector: 'app-arcade-sub-competition',
  templateUrl: './sub-competition.component.html',
  styleUrls: ['./sub-competition.component.css']
})
export class SubCompetitionComponent implements OnInit {
  @Input() competitions: Competition[];
  @Input() arcadeId: string;
  @Output() deletedFeedback = new EventEmitter<boolean>();

  gameState = State;

  isCollapsed: { [key: number]: boolean } = {};

  constructor(private subCompetitionService: SousCompetitionService) {

  }

  ngOnInit() {
    if (this.competitions) {
      this.competitions.forEach((_, index) => {
        this.isCollapsed[index] = true;
      });
    }
  }

  toggleCollapse(index: number) {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

 
  changeCompetitionState(gameCompetition: any) {
    gameCompetition.updatingState = true;
    this.subCompetitionService.changeState({
      gameCompetitionID: gameCompetition._id,
      state: (gameCompetition.gameState == State.NO_START) ? State.RUNNING: State.END,
    }).then(() => {
      gameCompetition.updatingState = false;
      gameCompetition.gameState = (gameCompetition.gameState == State.NO_START) ? State.RUNNING: State.END;
    }, (err) => {
      gameCompetition.updatingState = false;
    });
  }

  deletedSubCompettitionFeedback(newValue: string) {
    if(newValue)
      this.deletedFeedback.emit(true);
  }
}