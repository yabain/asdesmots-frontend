import { Component, OnInit } from '@angular/core';
import { Arcarde } from 'src/app/shared/entities/arcarde.model'

@Component({
  selector: 'app-arcarde',
  templateUrl: './arcarde.component.html',
  styleUrls: ['./arcarde.component.css'],
})
export class ArcardeComponent implements OnInit {
  arcardeData: Arcarde = new Arcarde();
  constructor() {}

  ngOnInit(): void {}
}
