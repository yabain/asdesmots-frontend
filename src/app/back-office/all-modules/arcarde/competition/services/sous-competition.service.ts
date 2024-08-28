import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { EndpointSousCompetion } from './Endpoint';
import { ToastrService } from 'ngx-toastr';
import { WinnigsCriterias } from 'src/app/shared/entities/winnigCriterias';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ArcardeService } from '../../services/arcarde.service';

@Injectable({
  providedIn: 'root',
})
export class SousCompetitionService {
  public newSubscriptionDetectedSubject = new BehaviorSubject<boolean>(false);
  public newSubscriptionDetected$: Observable<boolean> =
    this.newSubscriptionDetectedSubject.asObservable();

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
          (error: any) => {
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
    console.log('game competiton id :', data.gameCompetitionID);
    this.api
      .put(EndpointSousCompetion.COMPETITION_STATE, data, this.authorization)
      .subscribe(
        (response: any) => {
          this.toastr.success('Competition Started', 'Success', {
            timeOut: 10000,
          });
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
    return new Promise((resolve, reject) => {
      this.api
        .get(
          EndpointSousCompetion.GET_ALL_COMPETITION + CompetitionId,
          this.authorization
        )
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error: any) => {
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
            if (error.statusCode === 404)
              this.translate
                .get('arcade.arcade')
                .subscribe((arcade: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', { entity: arcade })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            else
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
            if (error.statusCode === 404)
              this.translate
                .get('competition.competition')
                .subscribe((competition: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', {
                      entity: competition,
                    })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            else
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
            if (error.statusCode === 404)
              this.translate
                .get('competition.competition')
                .subscribe((competition: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', {
                      entity: competition,
                    })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            else
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
            if (error.statusCode === 404)
              this.translate
                .get('arcade.arcade')
                .subscribe((arcade: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', { entity: arcade })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            else
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

  subscribePlayer(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${environment.url}/game-subscriptions`, data, {
          headers: this.headers,
        })
        .subscribe(
          (response) => {
            return resolve(response);
          },
          (error: any) => {
            console.log('Error: ',error);
            if (error.error === 'NotFound/GameCompetition-subscription')
              this.translate
                .get('competition.competition')
                .subscribe((competition: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', {
                      entity: competition,
                    })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            if (error.error === 'NotFound/GameArcarde-subscription')
              this.translate
                .get('arcade.arcade')
                .subscribe((arcade: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', {
                      entity: arcade,
                    })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            if (error.error === 'UnableSubscription/GameArcarde-subscription')
              this.translate
                .get('arcade.cantRegisterPlayer')
                .subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
            if (error.error === 'ServiceNotFound/GameArcarde-subscription')
              this.translate
                .get('arcade.feesRequired')
                .subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
            if (error.error === 'MaxPlayer/GameArcarde-subscription')
              this.translate
                .get('arcade.fullRegistrationSession')
                .subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
            if (error.error === 'NotFound/PlayerGame-subscription')
              this.translate
                .get('arcade.player')
                .subscribe((player: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', {
                      entity: player,
                    })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            if (error.error === 'AlreadyExists/GameArcarde-subscription')
              this.translate
                .get('arcade.player')
                .subscribe((player: string) => {
                  this.translate
                    .get('errorResponse.alreadyExists', {
                      entity: player,
                    })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            if (error.error === 'AlreadyExists/GameArcarde-subscription')
              this.translate
                .get('arcade.playerSubscribed')
                .subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
            if (error.error === 'DateRegistration/GameArcarde-subscription')
              this.translate
                .get('arcade.subscriptionDatesNotAllowed')
                .subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
            else
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

  unsubscribePlayer(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${environment.url}/game-subscriptions/unsubscribe`, data, {
          headers: this.headers,
        })
        .subscribe(
          (response) => {
            this.translate
              .get('arcade.unsubscribed')
              .subscribe((res: string) => {
                this.toastr.success(res, 'Success');
              });
            return resolve(response);
          },
          (error: any) => {
            if (error.error === 'NotFound/GameCompetition-subscription')
              this.translate
                .get('competition.competition')
                .subscribe((competition: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', {
                      entity: competition,
                    })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            if (error.error === 'NotFound/GameArcarde-subscription')
              this.translate
                .get('arcade.arcade')
                .subscribe((arcade: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', {
                      entity: arcade,
                    })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            if (error.error === 'NotFound/PlayerGame-subscription')
              this.translate
                .get('arcade.player')
                .subscribe((player: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', {
                      entity: player,
                    })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            else
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
            return reject(error);
          }
        );
    });
  }

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
            this.translate
              .get('competition.competition')
              .subscribe((competition: string) => {
                this.translate
                  .get('successResponse.updated')
                  .subscribe((message: string) => {
                    this.toastr.success(`${competition} ${message}`, 'Error');
                  });
              });
            resolve(resp.data);
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

  getCriterias(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(`${environment.url}/${EndpointSousCompetion.WINNINGS_CRITERIAS}`, {
          headers: this.headers,
        })
        .subscribe(
          (response) => {
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
          (error) => {
            if (error.statusCode === 404)
              this.translate
                .get('competition.competition')
                .subscribe((competition: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', {
                      entity: competition,
                    })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            else
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

  getCompetitionSubscribers(
    competitionId: string
  ): Promise<WinnigsCriterias[]> {
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
          (error) => {
            if (error.statusCode === 404)
              this.translate
                .get('competition.competition')
                .subscribe((competition: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', {
                      entity: competition,
                    })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            else
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
            this.translate
              .get('competition.criteria')
              .subscribe((arcade: string) => {
                this.translate
                  .get('successResponse.applied')
                  .subscribe((message: string) => {
                    this.toastr.success(`${arcade} ${message}`, 'Error');
                  });
              });
            resolve(resp);
          },
          (error) => {
            if (error.statusCode === 404)
              this.translate
                .get('competition.competition')
                .subscribe((competition: string) => {
                  this.translate
                    .get('errorResponse.entityNotFound', {
                      entity: competition,
                    })
                    .subscribe((res: string) => {
                      this.toastr.error(res, 'Error');
                    });
                });
            else
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

  removeWinningCriteria(gameId: string, gameWinnerCriteriasId: string) {
    return new Promise<boolean>((resolve, reject) => {
      const url =
        EndpointSousCompetion.REMOVE_GAME_CRITERIAS +
        `/${gameId}/${gameWinnerCriteriasId}`;

      this.api.deleteListWinnerCriterias(url, this.authorization).subscribe(
        (resp) => {
          this.translate
            .get('competition.criteria')
            .subscribe((arcade: string) => {
              this.translate
                .get('successResponse.removed')
                .subscribe((message: string) => {
                  this.toastr.success(`${arcade} ${message}`, 'Error');
                });
            });
          resolve(resp);
        },
        (error) => {
          if (error.statusCode === 404)
            this.translate
              .get('competition.competition')
              .subscribe((competition: string) => {
                this.translate
                  .get('errorResponse.entityNotFound', {
                    entity: competition,
                  })
                  .subscribe((res: string) => {
                    this.toastr.error(res, 'Error');
                  });
              });
          else
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
}
