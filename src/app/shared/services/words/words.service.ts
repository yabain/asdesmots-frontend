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
  wordsListfixed: Word[] = [
    {
      id: 'sdfsdfsdfsdfs',
      name: 'Maison',
      gameLevelId: 'jfhdsjklfghdskflhd',
      description: 'Ici la description du mot',
      type: '80',
    },
    {
      id: 'sdqhdfhsfghjfgf',
      name: 'Hôpital',
      gameLevelId: 'jfhdsjklfghdskflhd',
      description: 'Ici la description du mot',
      type: '80',
    },
    {
      id: 'dfdfgdfgdghjghj,',
      name: 'Bouteil',
      gameLevelId: 'jfhdsjklfghdskflhd',
      description: 'Ici la description du mot',
      type: '80',
    }
  ];

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private errorsService: ErrorsService
  ) { }

  createWord(word: Word): Promise<any> {

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
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
              this.toastr.success("Word has been add", 'Success', { timeOut: 5000 });
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
    console.log("update user: ", wordData);

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
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

  // Get News to server
  getAllWords(): Promise<any> {
    console.log('Get all words.')
    return new Promise((resolve, reject) => {
      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
      };

      console.log('Get all words 2.')
      this.api.get('users', headers)
        .subscribe(result => {
          // console.log("words-- -refresh: ", result);
          let tab: any = result.data;
          // console.log("users-- -refresh: ", result.data);
          // for (let i = 0; i < tab.length; i++) {
          //   tab[i] = this.parseDataFromApi(tab[i]);
          //   console.log('user ', i, ': ', tab[i]);
          // }
          localStorage.setItem("users-list", JSON.stringify(tab));
          resolve(result);
          return 0;

        }, error => {
          this.errorsService.errorsInformations(error, "get all word", '0')
          reject(error);
        });
    });
  }

  //recuperer les informations d'un utilisateur
  getWordById(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
      };

      console.log('Get all words 2.')
      this.api.get('users', headers)
        .subscribe(result => {
          // console.log("words-- -refresh: ", result);
          let tab: any = result.data;
          // console.log("users-- -refresh: ", result.data);
          // for (let i = 0; i < tab.length; i++) {
          //   tab[i] = this.parseDataFromApi(tab[i]);
          //   console.log('user ', i, ': ', tab[i]);
          // }
          localStorage.setItem("users-list", JSON.stringify(tab));
          resolve(result);
          return 0;

        }, error => {
          this.errorsService.errorsInformations(error, "get all word", '0')
          reject(error);
        });
    });
  }

  //recuperer les informations d'un utilisateur
  getWordListBylevel(levelId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let wordsList = JSON.parse(localStorage.getItem(levelId));
      // let wordList: Word = this.wordsList.find((u) => u.gameLevelId == levelId);
      if (wordsList != undefined) resolve(wordsList);
      else {
      this.api.get(`gamelevel/${levelId}/words`, {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
      }).subscribe(response => {
        // response.data = this.wordsListfixed;
        // this.wordsList = response.data;
        localStorage.setItem(levelId, JSON.stringify(response.data));

        resolve(response.data);
      }, error => {
        this.errorsService.errorsInformations(error, "get word's list", "0")
        reject(error);
      })
      }
    })
  }

  deleteWord(word: Word): Promise<any> {
    const headers = {
      'Authorization': 'Bearer ' + this.api.getAccessToken(),
      'Content-Type': 'application/json',
    };

    return new Promise((resolve, reject) => {
      this.api.delete(`gamelevel/${word.gameLevelId}/words/${word.id}`, headers)
        .subscribe(response => {
          this.toastr.success('Word was deleted !!', null, { timeOut: 5000 });
          resolve(response);
        }, error => {
          this; this.errorsService.errorsInformations(error, "delete word")
          reject(error);
        });
    });

  }
  
}
