import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { EndpointSousCompetion } from './Endpoint';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WinnigsCriterias } from 'src/app/shared/entities/winnigCriterias';
import { State } from 'src/app/shared/entities/state.enum';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Level } from 'src/app/shared/entities/level';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ArcardeService } from '../../services/arcarde.service';

@Injectable({
  providedIn: 'root',
})
export class SousCompetitionService {
  public newSubscriptionDetectedSubject = new BehaviorSubject<boolean>(false);
  public newSubscriptionDetected$: Observable<boolean> = this.newSubscriptionDetectedSubject.asObservable();

  authorization: any;
  headers = {
    Authorization: 'Bearer ' + this.api.getAccessToken(),
    'Content-Type': 'application/json; charset=UTF-8',
  };

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private arcardeService: ArcardeService,
    private translate: TranslateService,
    private httpClient: HttpClient
  ) {
    this.authorization = {
      Authorization: 'Bearer ' + this.api.getAccessToken(),
    };
  }
  deleteCompetition(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api
        .delete(
          `${EndpointSousCompetion.DELETE_COMPETITION}/${id}`,
          this.headers
        )
        .subscribe(
          (response) => {
            this.translate
              .get('competition.competition')
              .subscribe((word: string) => {
                this.translate
                  .get('successResponse.deleted')
                  .subscribe((message: string) => {
                    this.toastr.success(`${word} ${message}`, 'Error');
                  });
              });
            resolve(response);
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

  changeState(data: {
    gameArcardeID: string;
    gameCompetitionID: string;
    state: string;
  }) {
    this.clientChangeState(data.gameArcardeID, State.RUNNING);

    console.log('game competiton id :', data.gameCompetitionID);
    this.api
      .put(EndpointSousCompetion.COMPETITION_STATE, data, this.authorization)
      .subscribe(
        (response: any) => {
          this.toastr.success('Competition Started', 'Success', {
            timeOut: 10000,
          });
          this.clientChangeState(data.gameCompetitionID, State.WAITING_PLAYER);
        },
        (error: any) => {
          if (error.error.statusCode == 500) {
            this.toastr.error(
              'Internal Server Error. Try again later please.',
              'Error',
              { timeOut: 10000 }
            );
          } else if (error.error.statusCode == 401) {
            this.toastr.error('Invalid Token', 'error', { timeOut: 10000 });
          } else if (error.error.statusCode == 403) {
            this.toastr.error(error.error.message, 'Error', { timeOut: 10000 });
          } else if (error.error.statusCode == 404) {
            this.toastr.error('Game Arcarde not found', 'Error', {
              timeOut: 10000,
            });
          } else {
            this.toastr.error(error.error.message, 'Error1', { timeOut: 7000 });
          }
        }
      );
  }

  getCompetitionById(CompetitionId: any): Promise<any> {
    return this.api
      .get(
        EndpointSousCompetion.GET_ALL_COMPETITION + CompetitionId,
        this.authorization
      )
      .toPromise();
  }

  loadListCompetition(idCompetition: string) {
    this.api
      .get(
        EndpointSousCompetion.GET_ALL_COMPETITION + idCompetition,
        this.authorization
      )
      .subscribe((response) => {
        console.log('reponse serveur: ', response);
        if (response && response.data > 0) {
        }
      });
  }

  getArcadeCompetitions(arcadeId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(
          `${environment.url}/${EndpointSousCompetion.GET_ALL_BY_ARCADE}/${arcadeId}`,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error: any) => {
            if (error.status == 500) {
              this.toastr.error(
                'Internal Server Error. Try again later please.',
                'Error'
              );
            } else if (error.status == 401) {
              this.toastr.error('Invalid Token', 'error');
            } else {
              this.toastr.error(error.message, 'Error');
            }
            reject(error);
          }
        );
    });
  }

  getArcadeCompetitionsByChildCompetition(competitionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(
          `${environment.url}/${EndpointSousCompetion.GET_ALL_BY_COMPETITION}/${competitionId}`,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error: any) => {
            if (error.status == 500) {
              this.toastr.error(
                'Internal Server Error. Try again later please.',
                'Error'
              );
            } else if (error.status == 401) {
              this.toastr.error('Invalid Token', 'error');
            } else {
              this.toastr.error(error.message, 'Error');
            }
            reject(error);
          }
        );
    });
  }

  getArcadeCompetitionsWithChildren(arcadeId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(
          `${environment.url}/${EndpointSousCompetion.GET_ALL_WITH_CHILDREN_BY_ARCADE}/${arcadeId}`,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error: any) => {
            if (error.status == 500) {
              this.toastr.error(
                'Internal Server Error. Try again later please.',
                'Error'
              );
            } else if (error.status == 401) {
              this.toastr.error('Invalid Token', 'error');
            } else {
              this.toastr.error(error.message, 'Error');
            }
            reject(error);
          }
        );
    });
  }

  listCompetitionLocalisations(arcadeId: string) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(
          `${environment.url}/${EndpointSousCompetion.GET_LOCATIONS}/${arcadeId}`,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (response) => {
            return resolve(response);
          },
          (error: any) => {
            if (error.status == 500) {
              this.toastr.error(
                'Internal Server Error. Try again later please.',
                'Error'
              );
            } else if (error.status == 401) {
              this.toastr.error('Invalid Token', 'error');
            } else {
              this.toastr.error(error.message, 'Error');
            }
            reject(error);
          }
        );
    });
  }

  subscribePlayer(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(
          `${environment.url}/game-subscriptions`,
          data,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (response) => {
            this.toastr.success('Subscripttion success', 'success');
            return resolve(response);
          },
          (error: any) => {
            if (error.status == 500) {
              this.toastr.error(
                'Internal Server Error. Try again later please.',
                'Error'
              );
            } else if (error.status == 401) {
              this.toastr.error('Invalid Token', 'error');
            } else {
              console.log(error)
              this.toastr.error(error.message, 'Error');
            }
            reject(error);
          }
        );
    });
  }

  unsubscribePlayer(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(
          `${environment.url}/game-subscriptions/unsubscribe`,
          data,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (response) => {
            this.toastr.success('Unsubscribed successfully', 'success');
            return resolve(response);
          },
          (error: any) => {
            if (error.status == 500) {
              this.toastr.error(
                'Internal Server Error. Try again later please.',
                'Error'
              );
            } else if (error.status == 401) {
              this.toastr.error('Invalid Token', 'error');
            } else {
              console.log(error)
              this.toastr.error(error.message, 'Error');
            }
            reject(error);
          }
        );
    });
  }

  async clientChangeState(idCompet: string, statut: string) {
    //change the compett's state on user client (ui)

    const index = this.arcardeService.listUnderCompetion.findIndex(
      (compet) => compet._id === idCompet
    );
    if (index != -1) {
      this.arcardeService.listUnderCompetion[index].gameState = statut;
    }
  }

  create(formData: any, arcadeId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(
          `${environment.url}/${EndpointSousCompetion.CREATED_NEW_S_C}${arcadeId}`,
          formData,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (response: any) => {
            this.translate
              .get('competition.competition')
              .subscribe((competition: string) => {
                this.translate
                  .get('successResponse.created')
                  .subscribe((message: string) => {
                    this.toastr.success(`${competition} ${message}`, 'Error');
                  });
              });
            return resolve(response);
          },
          (error) => {
            if (
              error.includes('Competition already exists') ||
              error.errors?.alreadyUsed
            )
              this.translate
                .get('errorResponse.duplicatedEntry')
                .subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
            else
              this.translate
                .get('errorResponse.unexpectedError')
                .subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
            console.log(error);
            return reject(error);
          }
        );
    });
  }

  // update(idCompetition: string) {
  //   this.waitingResponse = true;
  //   this.api
  //     .put(
  //       EndpointSousCompetion.UPDATE_S_C + idCompetition,
  //       this.newUnderCompetionParam,
  //       this.authorization
  //     )
  //     .subscribe(
  //       (resp) => {
  //         console.log('update response', resp);
  //         console.log(
  //           'new under competition data',
  //           this.newUnderCompetionParam
  //         );
  //         this.toastr.success('Update Done ', 'SUCCESS', { timeOut: 7000 });
  //         this.waitingResponse = false;
  //         this.arcardeService.loadArcade();
  //       },
  //       (error: any) => {
  //         if (error.status == 500) {
  //           this.toastr.error(
  //             'Internal Server Error. Try again later please.',
  //             'Error',
  //             { timeOut: 10000 }
  //           );
  //         } else if (error.status == 401) {
  //           this.toastr.error('Invalid Token', 'error', { timeOut: 10000 });
  //         } else {
  //           this.toastr.error(error.message, 'Error', { timeOut: 7000 });
  //         }
  //         this.waitingResponse = false;
  //       }
  //     );
  //   console.log(this.formUpdate.value);
  // }

  update(competitionData: any, competitionId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .put(
          `${environment.url}/${
            EndpointSousCompetion.UPDATE_S_C + competitionId
          }`,
          competitionData,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (resp: any) => {
            resolve(resp.data);
            this.toastr.success('Update Done ', 'SUCCESS', { timeOut: 7000 });
          },
          (error) => {
            if (
              error.includes('Competition already exists') ||
              error.errors?.alreadyUsed
            )
              this.translate
                .get('errorResponse.duplicatedEntry')
                .subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
            else
              this.translate
                .get('errorResponse.unexpectedError')
                .subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
            return reject(error);
          }
        );
    });
  }

  loadAllCompetition() {
    //this.waitingResponse = true;
  }

  getCriterias(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(
          `${environment.url}/${EndpointSousCompetion.WINNINGS_CRITERIAS}`,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error: any) => {
            if (error.status == 500) {
              this.toastr.error(
                'Internal Server Error. Try again later please.',
                'Error'
              );
            } else if (error.status == 401) {
              this.toastr.error('Invalid Token', 'error');
            } else {
              this.toastr.error(error.message, 'Error');
            }
            reject(error);
          }
        );
    });
  }

  getCompetionWiningsCriteria(
    competitionId: string
  ): Promise<WinnigsCriterias[]> {
    return new Promise((resole, reject) => {
      this.api
        .get(
          EndpointSousCompetion.GAME_LIST_WINNINGS_CRITERIAS + competitionId,
          this.authorization
        )
        .subscribe(
          (resp) => {
            resole(resp);
          },
          (error: any) => {
            reject([]);
            if (error.status == 500) {
              this.toastr.error(
                'Internal Server Error. Try again later please.',
                'Error',
                { timeOut: 10000 }
              );
            } else if (error.status == 401) {
              this.toastr.error('Invalid Token', 'error', { timeOut: 10000 });
            } else {
              this.toastr.error(error.message, 'Error', { timeOut: 7000 });
            }
          }
        );
    });
  }

  getCompetitionSubscribers(competitionId: string): Promise<WinnigsCriterias[]> {
    return new Promise((resole, reject) => {
      this.httpClient
        .get(
          `${environment.url}/game-subscriptions/competition/${competitionId}`,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (resp: any) => {
            resole(resp);
          },
          (error: any) => {
            reject([]);
            if (error.status == 500) {
              this.toastr.error(
                'Internal Server Error. Try again later please.',
                'Error',
                { timeOut: 10000 }
              );
            } else if (error.status == 401) {
              this.toastr.error('Invalid Token', 'error', { timeOut: 10000 });
            } else {
              this.toastr.error(error.message, 'Error', { timeOut: 7000 });
            }
          }
        );
    });
  }

  applyCriterias(data: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.api
        .put(
          EndpointSousCompetion.APPLY_CRITERIAS_GAME,
          data,
          this.authorization
        )
        .subscribe(
          (resp) => {
            this.toastr.success('Criteria Add', 'SUCCESS', { timeOut: 7100 });
            resolve(true);
          },
          (error: any) => {
            if (error.status == 500) {
              this.toastr.error(
                'Internal Server Error. Try again later please.',
                'Error',
                { timeOut: 10000 }
              );
            } else if (error.status == 401) {
              this.toastr.error('Invalid Token', 'error', { timeOut: 10000 });
            } else if (
              error.status == 404 &&
              error.message == 'Game competition not found'
            ) {
              this.toastr.error('Game Competition not found', 'error', {
                timeOut: 10000,
              });
            } else if (
              error.status == 404 &&
              error.message == 'Game criteria already exist'
            ) {
              this.toastr.error('Game criteria already exist', 'error', {
                timeOut: 10000,
              });
            } else if (
              error.status == 404 &&
              error.message == 'Game criteria not found'
            ) {
              this.toastr.error('Game criteria not found', 'error', {
                timeOut: 10000,
              });
            } else {
              this.toastr.error(
                "Une erreur est survenue lors de l'ajout de ce critère",
                'Error',
                { timeOut: 7000 }
              );
            }
            reject(false);
          }
        );
    });
  }

  removeWinningCriteria(gameId: string, gameWinnerCriteriasId: string) {
    return new Promise<boolean>((resolve, reject) => {
      const url =
        EndpointSousCompetion.REMOVE_GAME_CRITERIAS +
        `/${gameId}/${gameWinnerCriteriasId}`;

      this.api.deleteListWinnerCriterias(url, this.authorization).subscribe(
        () => {
          this.toastr.success('Delete Done', 'SUCCESS', { timeOut: 7000 });
          resolve(true);
        },
        (error: any) => {
          if (error.status == 500) {
            this.toastr.error(
              'Internal Server Error. Try again later please.',
              'Error',
              { timeOut: 10000 }
            );
          } else if (error.status == 401) {
            this.toastr.error('Invalid Token', 'error', { timeOut: 10000 });
          } else {
            this.toastr.error(error.message, 'Error', { timeOut: 7000 });
          }
          reject(error);
        }
      );
    });
  }
}
