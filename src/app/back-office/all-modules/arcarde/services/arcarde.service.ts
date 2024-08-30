import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { Endpoint } from './endpoint.enum';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArcardeService {
  authorization: any;
  headers = {
    Authorization: 'Bearer ' + this.api.getAccessToken(),
    'Content-Type': 'application/json; charset=UTF-8',
  };

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private httpClient: HttpClient
  ) {
    this.authorization = {
      Authorization: 'Bearer ' + this.api.getAccessToken(),
    };
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
            reject(error);
          }
        );
    });
  }

  getArcadeSubscribers(arcadeId: string) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(`${environment.url}/game-subscriptions/arcade/${arcadeId}`, {
          headers: this.headers,
        })
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

  changeState(data: { gameArcardeID: string; state: any }) {
    return new Promise((resolve, reject) => {
      this.api.put(Endpoint.CHANGE_STATE, data, this.authorization).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error: any) => {
          // if (error.error == 'NotFound/GameArcarde-changestate')
          if (error.includes('Game arcarde not found'))
            this.translate.get('arcade.arcade').subscribe((arcade: string) => {
              this.translate
                .get('errorResponse.entityNotFound', { entity: arcade })
                .subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
            });
          // else if (
          //   error.error === 'Forbidden/GameCompetition-changestate-end' ||
          //   error.error === 'Forbidden/GameArcarde-changestate-end'
          // )
          else if (
            error.includes('The competition is over! it is no longer possible to start it') ||
            error.includes('The current date does not correspond to the start and end date of the game')
          )
            this.translate
              .get('arcade.startNotAllowed')
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

  getArcardeById(id: string): Promise<Arcarde> {
    return new Promise((resolve, reject) => {
      this.api
        .get(Endpoint.GET_ACARDE_BY_ID + id, this.authorization)
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
}
