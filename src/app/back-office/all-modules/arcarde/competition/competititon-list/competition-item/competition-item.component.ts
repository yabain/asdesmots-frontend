import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-competition-item',
  templateUrl: './competition-item.component.html',
  styleUrls: ['./competition-item.component.css']
})
export class CompetitionItemComponent implements OnInit {
  @Input() competition: any;
  constructor() { }

  ngOnInit(): void {
  }

}
