import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import { GamePart } from 'src/app/shared/entities/gamePart.model';
import { EndpointGamePart } from './Endpoint';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamePartsService {

  public partListChangedSubject = new BehaviorSubject<boolean>(false);
  public partListChanged$: Observable<boolean> = this.partListChangedSubject.asObservable();

  authorization: any;
  headers = {
    Authorization: 'Bearer ' + this.api.getAccessToken(),
    'Content-Type': 'application/json; charset=UTF-8',
  };

  constructor( 
        private api: ApiService,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private translate: TranslateService,
        private httpClient: HttpClient
  ) { this.authorization = {  'Authorization': 'Bearer ' + this.api.getAccessToken() } }

  

  AddGamePart(formData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(
          `${environment.url}/${EndpointGamePart.CREATE_PART}`,
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

  deleteGamePart(competitionID: string, gamePartID: string ){
    return new Promise((resolve, reject) => {
      this.api
        .delete(
          `${EndpointGamePart.DELETE_PART}${competitionID}/${gamePartID}`,
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

  getListGamePart(id: string):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.api.get(EndpointGamePart.GET_LIST+id, this.authorization).subscribe((data: any)=>{
          resolve(data)
      }, (error)=>{
        reject(error)
      });
    })
      
  }
}
