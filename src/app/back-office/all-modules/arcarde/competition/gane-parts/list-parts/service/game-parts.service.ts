import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { EndpointGamePart } from './Endpoint';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class GamePartsService {
  public partListChangedSubject = new BehaviorSubject<boolean>(false);
  public partListChanged$: Observable<boolean> =
    this.partListChangedSubject.asObservable();

  authorization: any;
  headers = {
    Authorization: 'Bearer ' + this.api.getAccessToken(),
    'Content-Type': 'application/json; charset=UTF-8',
  };

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private httpClient: HttpClient,
    private socket: Socket,
  ) {
    this.authorization = {
      Authorization: 'Bearer ' + this.api.getAccessToken(),
    };
    this.socket.on("change-game-part-state-error", (error) => {
      if (error.response?.message == "Game part not found")
        this.translate.get("competition.part").subscribe((part: string) => {
          this.translate
            .get("errorResponse.entityNotFound", { entity: part })
            .subscribe((res: string) => {
              this.toastr.error(res, "Error");
            });
        });
      else if (
        error.response?.message ==
        "You cannot start multiple games of the same competition simultaneously"
      )
        this.translate
          .get("competition.anotherRoundAlredyRunning")
          .subscribe((res: string) => {
            this.toastr.error(res, "Error");
          });
      else if (
        error.response?.message ==
        'The state of the competition must be in "In Progress" state for the competition to start'
      )
        this.translate
          .get("competition.mustBeRinning")
          .subscribe((res: string) => {
            this.toastr.error(res, "Error");
          });
      else
        this.translate
          .get("errorResponse.unexpectedError")
          .subscribe((res: string) => {
            this.toastr.error(res, "Error");
          });
    });
  }

  AddGamePart(formData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${environment.url}/${EndpointGamePart.CREATE_PART}`, formData, {
          headers: this.headers,
        })
        .subscribe(
          (response: any) => {
            this.translate.get('competition.part').subscribe((part: string) => {
              this.translate
                .get('successResponse.created', { entity: part })
                .subscribe((message: string) => {
                  this.toastr.success(message, 'Error');
                });
            });
            return resolve(response);
          },
          (error) => {
            if (
              error.includes('The given name is already used') ||
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

  deleteGamePart(competitionID: string, gamePartID: string) {
    return new Promise((resolve, reject) => {
      this.api
        .delete(
          `${EndpointGamePart.DELETE_PART}${competitionID}/${gamePartID}`,
          this.headers
        )
        .subscribe(
          (response) => {
            this.translate.get('competition.part').subscribe((part: string) => {
              this.translate
                .get('successResponse.deleted', { entity: part })
                .subscribe((message: string) => {
                  this.toastr.success(message, 'Error');
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

  getListGamePart(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api
        .get(EndpointGamePart.GET_LIST + id, this.authorization)
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            if (error.statusCode === 404)
              this.translate
                .get('competition.competition')
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
