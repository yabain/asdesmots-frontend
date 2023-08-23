import { Component, OnInit } from '@angular/core';
import { GameplayService } from '../service/gameplay.service';

@Component({
  selector: 'app-oncomming',
  templateUrl: './oncomming.component.html',
  styleUrls: ['./oncomming.component.css']
})
export class OncommingComponent implements OnInit {

  constructor( public gamePlay: GameplayService) { }

  ngOnInit(): void {
  }

}
