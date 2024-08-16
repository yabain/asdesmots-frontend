import { Component, Input, OnInit } from '@angular/core';
import { ArcardeService } from '../services/arcarde.service';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { UserService } from 'src/app/shared/services/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-arcade-suscribers',
  templateUrl: './arcade-suscribers.component.html',
  styleUrls: ['./arcade-suscribers.component.css'],
})
export class ArcadeSuscribersComponent implements OnInit {
  @Input() arcadeId: string;

  arcardeData: Arcarde = new Arcarde();
  subscribers: any[] = [];
  fetching: boolean = true;

  constructor(
    public arcadeService: ArcardeService,
    public userService: UserService,
    private arcardeService: ArcardeService
  ) {
  }

  ngOnInit() {
    this.getSubscribers();
  }

  getSubscribers() {
    this.arcadeService
      .getArcadeSubscribers(this.arcadeId)
      .then((response: any) => {
        this.subscribers = response.data?.map((sub) => {
          return sub.player;
        });
        console.log(this.subscribers)
        this.fetching = false;
      })
      .catch((error) => {
        console.error(error);
        this.fetching = false;
      });
  }

  loadAllArcarde() {
    if (this.arcadeService.listAllArcarde.length == 0) {
      this.arcadeService.loadAllArcarde();
    }
  }

  removeUser(userId: string) {
    this.arcardeService.UnsuscribeUserToAcarde({
      gameID: this.arcadeId,
      playerID: userId,
    });
  }
}
