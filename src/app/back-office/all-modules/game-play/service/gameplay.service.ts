import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { UserService } from 'src/app/shared/services/user/user.service';
import { EndpointGame } from './endpoint.enum';
import { ToastrService } from 'ngx-toastr';
import { State } from 'src/app/shared/entities/state.enum';
import { Observable, BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameplayService {

  waitingGameList: boolean = false;

  listCompetitionOnComming: any[] = [];
  listCompetitionStart: any[] = []

  authorization: any;
  headers = {
    Authorization: 'Bearer ' + this.api.getAccessToken(),
    'Content-Type': 'application/json; charset=UTF-8',
  };

  constructor(
    private api: ApiService,
      private userService: UserService,
      private translate: TranslateService,
      private toastr: ToastrService,
      private httpClient: HttpClient
  ) {
    this.authorization = {
      Authorization: 'Bearer ' + this.api.getAccessToken(),
    };
  }

  getPlayersRunningCompetitions() {
    return new Promise((resole, reject) => {
      this.httpClient
        .get(
          `${environment.url}/game-subscriptions/subscriber-games/${[State.RUNNING, State.WAITING_PLAYER]}`,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (resp: any) => {
            resole(resp);
          },
          (error) => {
              this.translate
                .get('errorResponse.unexpectedError')
                .subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
            reject(error);
          }
        );
    });
  }
  getPlayersOnCommingCompetitions() {
    return new Promise((resole, reject) => {
      this.httpClient
        .get(
          `${environment.url}/game-subscriptions/subscriber-games/${[State.NO_START]}`,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (resp: any) => {
            resole(resp);
          },
          (error) => {
              this.translate
                .get('errorResponse.unexpectedError')
                .subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
            reject(error);
          }
        );
    });
  }
  // loadUserCompetition(){
  //   const userID = this.userService.getLocalStorageUser()._id;
  //   this.waitingGameList = true;

  //   this.api.get(EndpointGame.LOAD_USER__COMPETITION+userID, this.authorization)
  //   .subscribe( (data: any)=>{
  //     this.filterCompetition(data.data).then(() => {
  //       this.filterPartIsWaitingPlayer();
  //     })
  //     console.log("isWaitingPlayer :", this.filterPartIsWaitingPlayer())
  //     this.waitingGameList = false;
  //   }, (error)=>{
  //     if(error.error.status == 401){
  //       this.toastr.error('Invalid Token', 'Error', {timeOut : 10000})
  //     }else if(error.error.status == 500) {
  //       this.toastr.error('Internal server Error', 'Error', {timeOut : 10000})
  //     }else{
  //       this.toastr.error(error.error.message, 'Error', {timeOut : 10000})
  //     }
  //     this.waitingGameList = false;

  //   })
  // }

  // async filterCompetition(listCompetition: any[]){
  //   //separeted oncoming competition with started competition
  //   this.listCompetitionOnComming = [];
  //   this.listCompetitionStart = [];
  //   if(listCompetition.length > 0){
  //        listCompetition.forEach((compet)=>{
  //           // if(compet.gameState === State.RUNNING) {
  //             this.listCompetitionStart.push(compet);
  //             console.log("liste des compétitions en cours :", this.listCompetitionStart)
  //           // }else {
  //             this.listCompetitionOnComming.push(compet);
  //           // }
  //        });
  //   }
  //   this.filterPartIsWaitingPlayer().then((result) => {
  //     // this.isWaitingPlayer = result;
  //   });
  // }

  // filterPartIsWaitingPlayer(): Promise<boolean> {
  //   return new Promise((resolve) => {
  //     let result = false;
  //     this.listCompetitionStart.forEach((competition) => {
  //       competition.gameParts.forEach((part) => {
  //         if (part.gameState === 'waiting_player') {
  //           result = true;
  //         }
  //       });
  //     });
  //     resolve(result);
  //   });
  // }
}
