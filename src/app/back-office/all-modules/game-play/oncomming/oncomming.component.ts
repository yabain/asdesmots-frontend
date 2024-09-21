import { Component, OnInit } from '@angular/core';
import { GameplayService } from '../service/gameplay.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-oncomming',
  templateUrl: './oncomming.component.html',
  styleUrls: ['./oncomming.component.css']
})
export class OncommingComponent implements OnInit {
  
  fetching: boolean = true;
  competitions: SousCompetion[] = [];
  placeholders = Array.from({ length: 12 }); // Crée un tableau de 8 éléments

  constructor(
    public gamePlay: GameplayService,
    private socket: Socket
  ) { }

  ngOnInit(): void {
    this.socket.on("game-statechange", (data) => {
      this.geCompetitions();
    });
    this.geCompetitions();
  }
  geCompetitions() {
    this.gamePlay
      .getPlayersOnCommingCompetitions()
      .then((response: any) => {
        this.competitions = response.data;
        this.fetching = false;
      })
      .catch((error) => {
        console.error(error);
        this.fetching = false;
      });
  }
}
