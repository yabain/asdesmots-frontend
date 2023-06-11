import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorsService } from 'src/app/shared/services/errors/errors.service';
import { Word } from 'src/app/shared/entities/word';



@Injectable({
  providedIn: 'root'
})
export class WordsService {

  params: any;
  wordData: any;

  wordsList: Word[] = [];

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private errorsService: ErrorsService
  ) { }

  createWord(word: Word): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Content-Type': 'application/json',
        // 'X-CSRF-Token': '97dKe-0-qukVOMY1YNBhsZ-POfPUArpL11YLfRJFD94',
        // 'Accept': 'application/json'
      };
      const params = {
        'name': word.name,
        'description': word.description,
        'gameLevelId': word.gameLevelId,
        'type': word.type,
      };

      this.api.post('gamelevel/word', params, headers)
        .subscribe((response: any) => {
          if (response) {
            if (response.statusCode === 201) {
              // this.router.navigate(['login']);
              this.toastr.success("Word has been add", 'Success', {timeOut: 5000});
            }
            resolve(response);
          }
        }, (error: any) => {
          this.errorsService.errorsInformations(error, "update word");
          reject(error);
        });
    });

  }
  // permet d'update les infos d'un user
  updateWord(wordId: any, wordData?: any): Promise<any> {
    console.log("upsate user: ", wordData);

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/hal+json',
        'Accept': 'application/json',
        'X-CSRF-Token': 'FWjJkOClVTMzyhEPEhz_OPR3PulweXUqi-NePcofKU8' || JSON.parse(localStorage.getItem('app-token'))
      }

      this.params = wordData;

      this.api.put(`gamelevel/word/${wordId}`, this.params, headers)
        .subscribe((response: any) => {
          if (response.statusCode === 201) {
            this.toastr.success("Your account has been created. You will receive a confirmation email.", 'Success', { timeOut: 7000 });
          }
          console.log("respose: ", response)
          resolve(response);
        }, (error: any) => {
          this.errorsService.errorsInformations(error, "update account")
          reject(error);
        });
    });
  }

  //recuperer les informations d'un utilisateur
  getWordById(id: String): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let word: Word = this.wordsList.find((u) => u.id == id);
      if (word != undefined) resolve(word);
      else {
        this.api.get(`user/profil/${id}`, {
          'Authorization': 'Bearer ' + this.api.getAccessToken(),

        }).subscribe(success => {
          if (success) {
            // console.log("Success ",success)
            if (success.resultCode == 0) {
              // resolve(this.parseDataFromApi(success.result));
            }
            else reject(success)

          }
          else reject(success)
        }, error => {
          reject(error);
        })
      }
    })
  }

}
