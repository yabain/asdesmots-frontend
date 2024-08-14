import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { EndpointSousCompetion } from './Endpoint';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArcardeService } from '../../arcarde/services/arcarde.service';
import { WinnigsCriterias } from 'src/app/shared/entities/winnigCriterias';
import { State } from 'src/app/shared/entities/state.enum';
import { Observable, map } from 'rxjs';
import { Level } from 'src/app/shared/entities/level';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SousCompetitionService {
  waitingResponse: boolean = false;
  creationDone: boolean = false;
  listUnderCompetition: SousCompetion[] = [];
  listUnderCompetitions: SousCompetion[] = [];

  listCompetionParent: any[] = [];

  newUnderCompetionParam: SousCompetion = new SousCompetion();
  underCompetiton: SousCompetion = new SousCompetion();
  listCompetionLocation: string[] = [];

  form: FormGroup; //created
  formUpdate: FormGroup;
  tmpIDLevel: string = '';

  authorization: any;

  listWinningCriterias: WinnigsCriterias[] = [];
  waitingCriteriasResp: boolean;
  waitingCriteriasAdd: boolean = false;
  waitingCreteriaDeletingDone: boolean = false;
  headers = {
    Authorization: 'Bearer ' + this.api.getAccessToken(),
    'Content-Type': 'application/json; charset=UTF-8',
  };

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private arcardeService: ArcardeService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private httpClient: HttpClient
  ) {
    this.authorization = {
      Authorization: 'Bearer ' + this.api.getAccessToken(),
    };
  }

  get f() {
    return this.form.controls;
  }

  get formUpdt() {
    return this.formUpdate.controls;
  }

  initFormUpdate() {
    this.formUpdate = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(60),
        ]),
      ],
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(65),
        ]),
      ],
      gameLevel: ['', Validators.required],
      isSinglePart: ['', Validators.required],
      canRegisterPlayer: [''],
      localisation: ['', Validators.required],
      maxPlayerLife: ['', Validators.required],
      maxTimeToPlay: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxOfWinners: ['', Validators.required],
      lang: [, Validators.required],
      parentCompetition: [, Validators.required],
      parentCompetionId: [''],
    });

    this.formUpdate.valueChanges.subscribe((data: any) => {
      Object.assign(this.newUnderCompetionParam, data);
    });
  }

  deleteCompetition(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.delete(`${EndpointSousCompetion.DELETE_COMPETITION}/${id}`, this.headers).subscribe(
        (response) => {
          this.translate.get('competition.competition').subscribe((word: string) => {
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
  initUpdatingValues(data: SousCompetion) {
    this.formUpdate.patchValue({
      name: data.name,
      description: data.description,
      gameLevel: data.gameLevel,
      isSinglePart: data.isSinglePart,
      canRegisterPlayer: data.canRegisterPlayer,
      localisation: data.localisation,
      maxPlayerLife: data.maxPlayerLife,
      maxTimeToPlay: data.maxTimeToPlay,
      startDate: data.startDate.slice(0, -8),
      endDate: data.endDate.slice(0, -8),
      maxOfWinners: data.maxOfWinners,
      lang: data.lang,
      parentCompetition: data.parentCompetition.name,
    });
    console.log('datacompetition init ', this.newUnderCompetionParam);
  }

  initFormControl() {
    //control creation new under competition
    this.form = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(60),
        ]),
      ],
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(65),
        ]),
      ],
      gameLevel: ['', Validators.required],
      isSinglePart: ['', Validators.required],
      canRegisterPlayer: [''],
      localisation: ['', Validators.required],
      maxPlayerLife: ['', Validators.required],
      maxTimeToPlay: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxOfWinners: ['', Validators.required],
      lang: ['', Validators.required],
      parentCompetition: [''],
      //gameWinnerCriterias : ['', Validators.required],
      //gameJudgesID: ['', Validators.required],
      // gameParts : ['', Validators.required]
    });
    this.initBooleanValues();
    this.form.valueChanges.subscribe((data: any) => {
      Object.assign(this.newUnderCompetionParam, data);
    });
  }

  initBooleanValues() {
    this.form.controls['isSinglePart'].setValue(false);
    this.form.controls['canRegisterPlayer'].setValue(false);
  }

  changeState(data: {
    gameArcardeID: string;
    gameCompetitionID: string;
    state: string;
  }) {
    this.waitingResponse = false;
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

          this.waitingResponse = false;
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
          this.waitingResponse = false;
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
          this.listUnderCompetitions = Array.from(response.data);
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
          `${environment.url}/${EndpointSousCompetion.UPDATE_S_C + competitionId}`,
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

  loadGameCriterias() {
    this.waitingCriteriasResp = true;
    this.api
      .get(EndpointSousCompetion.WINNINGS_CRITERIAS, this.authorization)
      .subscribe(
        (resp) => {
          this.waitingCriteriasResp = false;
          this.listWinningCriterias = Array.from(resp.data);
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
          this.waitingCriteriasResp = false;
        }
      );
  }

  getCompetionWiningsCriteria(
    idCompetition: string
  ): Promise<WinnigsCriterias[]> {
    this.waitingCriteriasResp = true;
    return new Promise((resole, reject) => {
      this.api
        .get(
          EndpointSousCompetion.GAME_LIST_WINNINGS_CRITERIAS + idCompetition,
          this.authorization
        )
        .subscribe(
          (resp) => {
            this.waitingCriteriasResp = false;
            resole(resp.data);
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
            this.waitingCriteriasResp = false;
          }
        );
    });
  }

  getCompetionsubscribers(idCompetition: string): Promise<any[]> {
    this.waitingCriteriasResp = true;
    return new Promise((resole, reject) => {
      this.api
        .get(
          `EndpointSousCompetion.GET_ALL_COMPETITION/participants${{
            idCompetition,
          }}`,
          this.authorization
        )
        .subscribe(
          (resp) => {
            this.waitingCriteriasResp = false;
            resole(resp.data);
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
            this.waitingCriteriasResp = false;
          }
        );
    });
  }

  addCriteria(gameId: string, gameWinnerCriteriasId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.waitingCriteriasAdd = true;
      const requestBody = {
        gameID: gameId,
        gammeWinnersID: gameWinnerCriteriasId,
      };
      console.log('request', requestBody);
      this.api
        .put(
          EndpointSousCompetion.ADD_CRITERIAS_GAME,
          requestBody,
          this.authorization
        )
        .subscribe(
          (resp) => {
            this.waitingCriteriasAdd = false;

            this.toastr.success('Criteria Add', 'SUCCESS', { timeOut: 7100 });
            resolve(true);
          },
          (error: any) => {
            this.waitingCriteriasAdd = false;
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
            resolve(false);
          }
        );
    });
  }

  removeWinningCriteria(gameId: string, gameWinnerCriteriasId: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.waitingCreteriaDeletingDone = true;
      const url =
        EndpointSousCompetion.REMOVE_GAME_CRITERIAS +
        `/${gameId}/${gameWinnerCriteriasId}`;

      console.log('GCI : ' + gameWinnerCriteriasId);

      this.api.deleteListWinnerCriterias(url, this.authorization).subscribe(
        () => {
          this.waitingCreteriaDeletingDone = false;
          this.toastr.success('Delete Done', 'SUCCESS', { timeOut: 7000 });
          resolve(true);
        },
        (error: any) => {
          this.waitingCreteriaDeletingDone = false;
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
          resolve(false);
        }
      );
    });
  }

  buildListParentCompetition(id_arcarde: number) {
    const index = this.arcardeService.listArcardeUser.findIndex(
      (arcarde) => arcarde._id == id_arcarde
    );
    if (index != -1) {
      this.listCompetionParent =
        this.arcardeService.listArcardeUser[index].competitionGames;
    }
  }

  loadListUnderCompetition() {
    this.listUnderCompetition = Array.from(
      this.arcardeService.listUnderCompetion
    );
  }

  getData(id: any) {
    const index = this.listUnderCompetition.findIndex(
      (compet) => compet._id === id
    );
    if (index != -1) {
      return this.listUnderCompetition[index];
    }
    return new SousCompetion();
  }

  getParentCompetitionID(idCompetition: string): string {
    let parentID;
    parentID = this.underCompetiton.parentCompetition._id;
    return parentID;
  }
}
