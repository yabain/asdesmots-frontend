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
          },(error) => {
            this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
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
          }, (error) => {
            if(error.includes('Arcade already exists') || error.errors?.alreadyUsed) 
              this.translate.get('errorResponse.duplicatedEntry').subscribe((res: string) => {
                this.toastr.error(res, 'Error');
              });
            else 
              this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
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
        .get(
          `${environment.url}/game-subscriptions/arcade/${arcadeId}`,
          {
            headers: this.headers,
          }
        )
        .subscribe(
          (response) => {
            return resolve(response);
          },
          (error: any) => {
            if(error.statusCode === 404) 
              this.translate.get('arcade.arcade').subscribe((arcade: string) => {
                this.translate.get('errorResponse.entityNotFound', { entity: arcade }).subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
              });
            else 
            this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
              this.toastr.error(res, 'Error');
            });
            reject(error);
          }
        );
    });
  }

  changeState(data: { gameArcardeID: string; state: any }) {
    // this.waitingResponse = false;

    // console.log('game arcarde id :', data.gameArcardeID);
    // this.api.put(Endpoint.CHANGE_STATE, data, this.authorization).subscribe(
    //   (response: any) => {
    //     this.toastr.success('Arcarde Started', 'Success', { timeOut: 10000 });
    //     this.clientChangeState(data.gameArcardeID, State.WAITING_PLAYER);

    //     this.waitingResponse = false;
    //   },
    //   (error: any) => {
    //     console.log('error ', error);
    //     if (error.error.statusCode == 500) {
    //       this.toastr.error(
    //         this.languageService.transformMessageLanguage('internalError'),
    //         this.languageService.transformMessageLanguage('error'),
    //         { timeOut: 10000 }
    //       );
    //     } else if (error.error.statusCode == 401) {
    //       this.toastr.error(
    //         this.languageService.transformMessageLanguage('refreshPage'),
    //         this.languageService.transformMessageLanguage('offSession'),
    //         { timeOut: 10000 }
    //       );
    //     } else if (error.error.statusCode == 403) {
    //       this.toastr.error(
    //         this.languageService.transformMessageLanguage(error.error.message),
    //         this.languageService.transformMessageLanguage('error'),
    //         { timeOut: 10000 }
    //       );
    //     } else if (error.error.statusCode == 404) {
    //       this.toastr.error(
    //         this.languageService.transformMessageLanguage('arcardenotFound'),
    //         this.languageService.transformMessageLanguage('error'),
    //         { timeOut: 10000 }
    //       );
    //     } else {
    //       this.toastr.error(
    //         this.languageService.transformMessageLanguage('noInternet'),
    //         this.languageService.transformMessageLanguage('error'),
    //         { timeOut: 7000 }
    //       );
    //     }
    //     this.waitingResponse = false;
    //   }
    // );
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
          this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
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
            if(error.statusCode === 404) 
              this.translate.get('arcade.arcade').subscribe((arcade: string) => {
                this.translate.get('errorResponse.entityNotFound', { entity: arcade }).subscribe((res: string) => {
                  this.toastr.error(res, 'Error');
                });
              });
            else 
            this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
              this.toastr.error(res, 'Error');
            });
            reject(error);
          }
        );
    });
  }
}
