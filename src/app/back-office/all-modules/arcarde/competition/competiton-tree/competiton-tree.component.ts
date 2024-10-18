import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-competiton-tree',
  templateUrl: './competiton-tree.component.html',
  styleUrls: ['./competiton-tree.component.css']
})
export class CompetitonTreeComponent implements OnInit {
  @Input() competitions: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
