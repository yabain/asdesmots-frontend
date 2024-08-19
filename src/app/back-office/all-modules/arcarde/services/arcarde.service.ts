import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { Endpoint } from './endpoint.enum';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/entities/user';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { State } from 'src/app/shared/entities/state.enum';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArcardeService {
  listArcardeUser: Arcarde[] = [];
  listAllArcarde: Arcarde[] = [];
  listLocationArcarde: string[] = [];
  listUnderCompetion: SousCompetion[] = [];
  listParticipant: any[];
  listUserData: any[] = [];

  competitionParent: any[] = [];

  listUser: User[] = [];
  authorization: any;
  waitingResponse: boolean = false;
  unsuscriptionDone: boolean = false;
  suscriptionDone: boolean = false;

  formControlSuscription!: FormGroup;
  souscriptionParam: any;

  formControlCreateArcarde!: FormGroup;
  newArcarde: Arcarde = new Arcarde();
  isCreationDone: boolean = false;

  dateNow: Date = new Date();

  deleteDone: boolean = false;
  waitingResponseSuscrib: boolean = false;
  formUpdate: any;
  headers = {
    Authorization: 'Bearer ' + this.api.getAccessToken(),
    'Content-Type': 'application/json; charset=UTF-8',
  };
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private location: Location,
    private languageService: TranslationService,
    private httpClient: HttpClient
  ) {
    this.authorization = {
      Authorization: 'Bearer ' + this.api.getAccessToken(),
    };
  }

  get f() {
    return this.formControlSuscription.controls;
  }

  get f_Creation() {
    return this.formControlCreateArcarde.controls;
  }

  loadArcade() {
    //get the list arcarde of the current user
    this.listArcardeUser = [];
    this.waitingResponse = true;
    this.listUnderCompetion = [];
    this.api.get(Endpoint.LOAD_ARCARDE_LIST, this.authorization).subscribe(
      (resp: any) => {
        this.waitingResponse = false;
        this.listArcardeUser = Array.from(resp.data);
        this.buildListUnderCompetion(this.listArcardeUser);
        console.log('liste des competitions: ', this.listUnderCompetion);
        this.buildListLocation(this.listArcardeUser);
      },
      (error: any) => {
        this.waitingResponse = false;
        if (error.status == 500) {
          this.toastr.error(
            this.languageService.transformMessageLanguage('internalError'),
            this.languageService.transformMessageLanguage('error'),
            { timeOut: 10000 }
          );
        } else if (error.status == 401) {
          this.toastr.error(
            this.languageService.transformMessageLanguage('refreshPage'),
            this.languageService.transformMessageLanguage('offSession'),
            { timeOut: 10000 }
          );
        } else if (error.status == 404) {
          this.toastr.error(
            this.languageService.transformMessageLanguage('arcardenotFound'),
            this.languageService.transformMessageLanguage('error'),
            { timeOut: 10000 }
          );
        } else {
          this.toastr.error(
            this.languageService.transformMessageLanguage('noInternet'),
            this.languageService.transformMessageLanguage('error'),
            { timeOut: 7000 }
          );
        }
      }
    );
  }

  getAllArcades(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(`${environment.url}/${Endpoint.LOAD_ARCARDE_LIST}`, {
          headers: this.headers,
        })
        .subscribe(
          (response) => {
            resolve(response);
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

  getUserDataById(userId: string): any {
    const userDataString = localStorage.getItem('users-list');
    if (userDataString) {
      const usersDatas = JSON.parse(userDataString);
      console.log('usersDatas: ', usersDatas);
      if (usersDatas._id === userId) {
        console.log('user founded');
        return usersDatas;
      }
    }
    return null;
  }

  getUserById(userId: string): User | null {
    // Récupérer la liste des utilisateurs depuis le localStorage
    const userListString = localStorage.getItem('users-list');

    if (userListString) {
      // Convertir la chaîne de caractères en tableau d'objets
      const userList: User[] = JSON.parse(userListString);
      // Parcourir la liste des utilisateurs
      for (const user of userList) {
        // Comparer l'identifiant avec celui en paramètre
        if (user._id === userId) {
          // L'identifiant correspond, renvoyer l'utilisateur
          return user;
        }
      }
    }

    // Aucune correspondance d'identifiant trouvée, renvoyer null
    return null;
  }

  loadAllArcarde() {
    //call the endpoint to get list of arcades
    this.listAllArcarde = [];
    this.waitingResponse = true;
    this.api
      .get(Endpoint.GET_LIST_ARCARDE + -1 + '/' + -1, this.authorization)
      .subscribe(
        (response) => {
          this.listAllArcarde = Array.from(response.data);
          this.buildListUnderCompetion(this.listAllArcarde);
          console.log('liste competitions: ', this.listUnderCompetion);
          this.waitingResponse = false;

          // this.buildListLocation(this.listAllArcarde);
        },
        (error: any) => {
          this.waitingResponse = false;

          if (error.status == 500) {
            this.toastr.error(
              this.languageService.transformMessageLanguage('internalError'),
              this.languageService.transformMessageLanguage('error'),
              { timeOut: 10000 }
            );
          } else if (error.status == 401) {
            this.toastr.error(
              this.languageService.transformMessageLanguage('refreshPage'),
              this.languageService.transformMessageLanguage('offSession'),
              { timeOut: 10000 }
            );
          } else if (error.status == 404) {
            this.toastr.error(
              this.languageService.transformMessageLanguage('arcardenotFound'),
              this.languageService.transformMessageLanguage('error'),
              { timeOut: 10000 }
            );
          } else {
            this.toastr.error(
              this.languageService.transformMessageLanguage('noInternet'),
              this.languageService.transformMessageLanguage('error'),
              { timeOut: 7000 }
            );
          }
        }
      );
  }

  create(formData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${environment.url}/${Endpoint.CREATE_ARCARDE}`, formData, {
          headers: this.headers,
        })
        .subscribe(
          (response: any) => {
            this.translate.get('arcade.arcade').subscribe((arcade: string) => {
              this.translate
                .get('successResponse.created')
                .subscribe((message: string) => {
                  this.toastr.success(`${arcade} ${message}`, 'Error');
                });
            });
            return resolve(response);
          },
          (error) => {
            if (
              error.includes('Arcade already exists') ||
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

  getArcadeSubscribers(arcadeId: string) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(
          // `${environment.url}/${Endpoint.GET_USERS_ARCARDE + id}/subscription`,
          `${environment.url}/game-subscriptions/arcade/${arcadeId}`,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (response) => {
            return resolve(response);
          },
          (error) => {
            if (error.status == 500) {
              this.toastr.error(
                this.languageService.transformMessageLanguage(
                  'Internal Server Error. Try again later please.'
                ),
                'Error',
                { timeOut: 10000 }
              );
            } 
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

  changeState(data: { gameArcardeID: string; state: any }) {
    this.waitingResponse = false;

    console.log('game arcarde id :', data.gameArcardeID);
    this.api.put(Endpoint.CHANGE_STATE, data, this.authorization).subscribe(
      (response: any) => {
        this.toastr.success('Arcarde Started', 'Success', { timeOut: 10000 });
        this.clientChangeState(data.gameArcardeID, State.WAITING_PLAYER);

        this.waitingResponse = false;
      },
      (error: any) => {
        console.log('error ', error);
        if (error.error.statusCode == 500) {
          this.toastr.error(
            this.languageService.transformMessageLanguage('internalError'),
            this.languageService.transformMessageLanguage('error'),
            { timeOut: 10000 }
          );
        } else if (error.error.statusCode == 401) {
          this.toastr.error(
            this.languageService.transformMessageLanguage('refreshPage'),
            this.languageService.transformMessageLanguage('offSession'),
            { timeOut: 10000 }
          );
        } else if (error.error.statusCode == 403) {
          this.toastr.error(
            this.languageService.transformMessageLanguage(error.error.message),
            this.languageService.transformMessageLanguage('error'),
            { timeOut: 10000 }
          );
        } else if (error.error.statusCode == 404) {
          this.toastr.error(
            this.languageService.transformMessageLanguage('arcardenotFound'),
            this.languageService.transformMessageLanguage('error'),
            { timeOut: 10000 }
          );
        } else {
          this.toastr.error(
            this.languageService.transformMessageLanguage('noInternet'),
            this.languageService.transformMessageLanguage('error'),
            { timeOut: 7000 }
          );
        }
        this.waitingResponse = false;
      }
    );
  }

  async clientChangeState(idArcarde: string, statut: string) {
    //change the arcarde's state on user client (ui)

    const index = this.listArcardeUser.findIndex(
      (arcarde) => arcarde._id === idArcarde
    );
    if (index != -1) {
      this.listArcardeUser[index].gameState = statut;
    }
  }

  deleteArcarde(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.delete(Endpoint.DELETE_ARCARDE + id, this.headers).subscribe(
        (response) => {
          this.translate.get('arcade.arcade').subscribe((word: string) => {
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

  getArcardeById(id: string): Promise<Arcarde> {
    return new Promise((resolve, reject) => {
      this.api
        .get(Endpoint.GET_ACARDE_BY_ID + id, this.authorization)
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  addUserToAccarde() {
    this.waitingResponseSuscrib = true;
    this.suscriptionDone = false;

    this.api
      .post(
        Endpoint.ADD_USER_TO_ARCARDE,
        this.souscriptionParam,
        this.authorization
      )
      .subscribe(
        (resp) => {
          this.toastr.success(
            this.languageService.transformMessageLanguage(
              'Suscription Done and Save'
            ),
            'Success',
            { timeOut: 10000 }
          );
          this.waitingResponseSuscrib = false;
          this.suscriptionDone = true;
        },
        (error: any) => {
          if (error.error.statusCode == 500) {
            this.toastr.error(
              this.languageService.transformMessageLanguage('internalError'),
              this.languageService.transformMessageLanguage('error'),
              { timeOut: 10000 }
            );
          } else if (error.error.statusCode == 401) {
            this.toastr.error(
              this.languageService.transformMessageLanguage('refreshPage'),
              this.languageService.transformMessageLanguage('offSession'),
              { timeOut: 10000 }
            );
          } else if (error.error.statusCode == 404) {
            this.toastr.error(
              this.languageService.transformMessageLanguage('arcardenotFound'),
              this.languageService.transformMessageLanguage('error'),
              { timeOut: 10000 }
            );
          } else if (error.error.statusCode == 400) {
            this.toastr.error(
              this.languageService.transformMessageLanguage(
                'Player already subscribed to the game'
              ),
              this.languageService.transformMessageLanguage('error'),
              { timeOut: 10000 }
            );
          } else {
            this.toastr.error(
              this.languageService.transformMessageLanguage('noInternet'),
              this.languageService.transformMessageLanguage('error'),
              { timeOut: 7000 }
            );
          }

          this.waitingResponseSuscrib = false;
          this.suscriptionDone = false;
        }
      );
  }

  UnsuscribeUserToAcarde(requestBody: { gameID: string; playerID: string }) {
    this.waitingResponse = true;

    this.api.post(Endpoint.DELETE_USER_TO_ARCARDE, requestBody).subscribe(
      (resp) => {
        this.toastr.success(
          this.languageService.transformMessageLanguage('Unsuscription Done'),
          this.languageService.transformMessageLanguage('succes'),
          { timeOut: 10000 }
        );
        this.unsuscriptionDone = true;
        this.waitingResponse = false;
        console.log('response', resp);
      },
      (error: any) => {
        if (error.error.status == 500) {
          this.toastr.error(
            this.languageService.transformMessageLanguage('internalError'),
            this.languageService.transformMessageLanguage('error'),
            { timeOut: 10000 }
          );
        } else if (error.error.status == 401) {
          this.toastr.error(
            this.languageService.transformMessageLanguage('refreshPage'),
            this.languageService.transformMessageLanguage('offSession'),
            { timeOut: 10000 }
          );
        } else if (error.error.status == 404) {
          this.toastr.error(
            this.languageService.transformMessageLanguage('arcardenotFound'),
            this.languageService.transformMessageLanguage('error'),
            { timeOut: 10000 }
          );
        } else {
          this.toastr.error(
            this.languageService.transformMessageLanguage('noInternet'),
            this.languageService.transformMessageLanguage('error'),
            { timeOut: 7000 }
          );
        }
        this.waitingResponse = false;
      }
    );
  }

  async buildListUnderCompetion(listArcarde: Arcarde[]) {
    this.listUnderCompetion = [];
    listArcarde.forEach((arcarde) => {
      this.listUnderCompetion = Array.from(
        this.listUnderCompetion.concat(arcarde.competitionGames)
      );
    });
  }

  getCompetitonArcardeID(idCompet: string) {
    let parentArcardeId: string = '';

    this.listArcardeUser.forEach((arcarde) => {
      arcarde.competitionGames.forEach((compet) => {
        if (compet._id === idCompet) {
          parentArcardeId = arcarde._id;
        }
      });
    });
    return parentArcardeId;
  }

  async buildListLocation(listArcarde: Arcarde[]) {
    this.listLocationArcarde = [];
    let i_arcarde = 0;
    if (listArcarde.length > 0) {
      listArcarde.forEach((arcade) => {
        if (arcade.competitionGames.length > 0) {
          arcade.competitionGames.forEach((compet) => {
            if (
              compet.localisation.toString() !== '' ||
              compet.localisation.toString().length != 0
            ) {
              this.listLocationArcarde[i_arcarde] = compet.localisation;
            }
            i_arcarde++;
          });
        }
      });
    }
  }
}
