import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-part-modal',
  templateUrl: './delete-part-modal.component.html',
  styleUrls: ['./delete-part-modal.component.css'],
})
export class DeletePartModalComponent implements OnInit {
  @Input() gamePart: any;
  @Output() deletedFeedback = new EventEmitter<boolean>();

  fetching: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  delete() {
    this.deletedFeedback.emit(true);
  }
}
