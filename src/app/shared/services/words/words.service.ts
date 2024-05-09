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
  headers = {
    'Authorization': 'Bearer ' + this.api.getAccessToken(),
    'Content-Type': 'application/json',
  }

  wordsList: Word[] = [];
  wordsListfixed: Word[] = [
    {
      _id: 'sdfsdfsdfsdfs',
      name: 'Maison',
      createdAt: '',
      description: 'Ici la description du mot',
      type: '80',
    },
    {
      _id: 'sdqhdfhsfghjfgf',
      name: 'Hôpital',
      createdAt: '',
      description: 'Ici la description du mot',
      type: '80',
    },
    {
      _id: 'dfdfgdfgdghjghj,',
      name: 'Bouteil',
      createdAt: '',
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

  createWord([wordEnForm, wordFrForm]: any): Promise<any> {

    return new Promise((resolve, reject) => {

      // const params = {
      //   'name': word.name,
      //   'description': word.description,
      //   'type': word.type,
      //   'gameLevelId': word.
      // };

      this.api.post('gamelevel/word', [wordEnForm, wordFrForm], this.headers)
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
  updateWord(wordData: any): Promise<any> {
    console.log("update word: ", wordData);
    return new Promise((resolve, reject) => {
      let params = {
        "name": wordData.name,
        "description": wordData.description,
        "type": wordData.type,
        "gameLevelId": wordData.gameLevelId
      };
      this.api.put(`gamelevel/${wordData.gameLevelId}/word/${wordData._id}`, params, this.headers)
        .subscribe((response: any) => {
            this.toastr.success("The word has been updated", 'Success', { timeOut: 7000 });
          console.log("respose: ", response)
          resolve(response);
        }, (error) => {
          if(error.error.message[0].includes('duplicate key') == true){
            this.toastr.warning("", 'This word exist', { timeOut: 10000 });
          } else {
            this.errorsService.errorsInformations(error, "update word")
          }
          reject(error);
        });
    });
  }

  // Get News to server
  getAllWords(): Promise<any> {
    console.log('Get all words.')
    return new Promise((resolve, reject) => {
      this.api.get('words', this.headers)
        .subscribe(result => {
          // console.log("words-- -refresh: ", result);
          let tab: any = result.data;
          // console.log("users-- -refresh: ", result.data);
          // for (let i = 0; i < tab.length; i++) {
          //   tab[i] = this.parseDataFromApi(tab[i]);
          //   console.log('user ', i, ': ', tab[i]);
          // }
          localStorage.setItem("word-list", JSON.stringify(tab));
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
  getWordListBylevel(levelId, isRefresh?: boolean): Promise<any> {
    if (isRefresh === true) {
      return new Promise<any>((resolve, reject) => {
        this.api.get(`gamelevel/${levelId}/words`, this.headers)
          .subscribe(response => {
            localStorage.setItem(levelId, JSON.stringify(response.data));
            resolve(response.data);
          }, error => {
            this.errorsService.errorsInformations(error, "get word's list", "0")
            reject(error);
          })
      })
    }
    else {
      return new Promise<any>((resolve, reject) => {
        // let wordList: Word = this.wordsList.find((u) => u.gameLevelId == levelId);
        let wordsList = JSON.parse(localStorage.getItem(levelId));
        if (wordsList != undefined) resolve(wordsList);
        else {
          this.api.get(`gamelevel/${levelId}/words`, this.headers)
            .subscribe(response => {
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
  }

  deleteWord(word: Word, gameLevelId: string): Promise<any> {

    return new Promise((resolve, reject) => {
      this.api.delete(`gamelevel/${gameLevelId}/words/${word._id}`, this.headers)
        .subscribe(response => {
          this.toastr.success('Word was deleted !!', null, { timeOut: 5000 });
          resolve(response);
        }, error => {
          this; this.errorsService.errorsInformations(error, "delete word")
          reject(error);
        });
    });

  }

  parseWordFromApi(wordData: Record<string | number, any>): Word {
    let word = new Word(wordData);
    word._id = wordData.id;
    word.name = wordData.name;
    word.description = wordData.description;
    word.createdAt = wordData.createdAt;
    word.type = word.type;
    return word;
  }

  parseWordForApi(wordData) {
    let word: any = {
      _id: wordData.id,
      name: wordData.name,
      description: wordData.description,
      type: wordData.type
    }
    return word;

  }

}
