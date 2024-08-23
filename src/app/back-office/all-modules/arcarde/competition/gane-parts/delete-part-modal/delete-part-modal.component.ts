import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GamePartsService } from '../list-parts/service/game-parts.service';

@Component({
  selector: 'app-delete-part-modal',
  templateUrl: './delete-part-modal.component.html',
  styleUrls: ['./delete-part-modal.component.css'],
})
export class DeletePartModalComponent implements OnInit {
  @Input() gamePart: any;
  @Input() competitionId: string;

  @Output() deletedFeedback = new EventEmitter<boolean>();

  fetching: boolean = false;

  constructor(private gamePartService: GamePartsService) {}

  ngOnInit(): void {}

  delete() {
    
    this.fetching = true;
    this.gamePartService.deleteGamePart(this.competitionId, this.gamePart._id).then(() => {
    this.gamePartService.partListChangedSubject.next(true);
      this.fetching = false;
      $(`#cancel-btn00-${this.gamePart._id}`).click();
    })
    .catch((error) => {
      this.fetching = false;
    });
  }
}
