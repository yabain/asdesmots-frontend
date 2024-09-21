import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-part-details-modal',
  templateUrl: './part-details-modal.component.html',
  styleUrls: ['./part-details-modal.component.css']
})
export class PartDetailsModalComponent implements OnInit {
  @Input() gamePart: any;

  constructor() { }

  ngOnInit(): void {
  }

}
