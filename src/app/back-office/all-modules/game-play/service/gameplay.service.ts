import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { UserService } from 'src/app/shared/services/user/user.service';
import { EndpointGame } from './endpoint.enum';
import { ToastrService } from 'ngx-toastr';
import { State } from 'src/app/shared/entities/state.enum';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameplayService {

  waitingGameList: boolean = false;

  listCompetitionOnComming: any[] = [
   /* {
      name: 'Competition des mots 1',
      description: 'Instructif ....',
      startDate: '11/12/2023',
      endDate: '12/12/2023',

    },
    {
      name: 'Competition Orange',
      description: 'Passionants ...',
      startDate: '8/12/2023',
      endDate: '9/12/2023',

    }*/
  ];

  listCompetitionStart: any[] = [
    {
      name: 'Competition Centre linguistique',
      description: 'Passionants ...',
      maxPlayerLife: 5,
      maxTimeToPlay: 20,
      maxOfWinners: 1,
      gameLevel: 'Beginner'
    }
  ]

  authorization: any;

  constructor(
      private userService: UserService,
      private apiService: ApiService,
      private toastr: ToastrService
  ) {
    this.authorization = { 'Authorization': 'Bearer ' + this.apiService.getAccessToken() }
  }
  private _isWaitingPlayerSubject = new BehaviorSubject<boolean>(false);


  get isWaitingPlayer$(): Observable<boolean> {
    return this._isWaitingPlayerSubject.asObservable();
  }

  set isWaitingPlayer(value: boolean) {
    this._isWaitingPlayerSubject.next(value);
  }
  loadUserCompetition(){
    const userID = this.userService.getLocalStorageUser()._id;
    this.waitingGameList = true;

    this.apiService.get(EndpointGame.LOAD_USER__COMPETITION+userID, this.authorization)
    .subscribe( (data: any)=>{
      this.filterCompetition(data.data).then(() => {
        this.filterPartIsWaitingPlayer();
      })
      console.log("isWaitingPlayer :", this.filterPartIsWaitingPlayer())
      this.waitingGameList = false;
    }, (error)=>{
      if(error.error.status == 401){
        this.toastr.error('Invalid Token', 'Error', {timeOut : 10000})
      }else if(error.error.status == 500) {
        this.toastr.error('Internal server Error', 'Error', {timeOut : 10000})
      }else{
        this.toastr.error(error.error.message, 'Error', {timeOut : 10000})
      }
      this.waitingGameList = false;

    })
  }

  async filterCompetition(listCompetition: any[]){
    //separeted oncoming competition with started competition
    this.listCompetitionOnComming = [];
    this.listCompetitionStart = [];
    if(listCompetition.length > 0){
         listCompetition.forEach((compet)=>{
            if(compet.gameState === State.RUNNING) {
                this.listCompetitionStart.push(compet);
                console.log("liste des compétitions en cours :", this.listCompetitionStart)
            }else {
                this.listCompetitionOnComming.push(compet);
            }
         });
    }
    this.filterPartIsWaitingPlayer().then((result) => {
      this.isWaitingPlayer = result;
    });
  }

  filterPartIsWaitingPlayer(): Promise<boolean> {
    return new Promise((resolve) => {
      let result = false;
      this.listCompetitionStart.forEach((competition) => {
        competition.gameParts.forEach((part) => {
          if (part.gameState === 'waiting_player') {
            result = true;
          }
        });
      });
      resolve(result);
    });
  }
}
