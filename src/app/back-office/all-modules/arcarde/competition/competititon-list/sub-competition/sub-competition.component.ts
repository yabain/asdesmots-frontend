import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { State } from 'src/app/shared/entities/state.enum';


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

  startCompetition(idCompetition: string){
    
  }

  deletedSubCompettitionFeedback(newValue: string) {
    if(newValue)
      this.deletedFeedback.emit(true);
  }
}