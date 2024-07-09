import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorsService } from 'src/app/shared/services/errors/errors.service';
import { Word } from 'src/app/shared/entities/word';
import { TranslateService } from '@ngx-translate/core';



@Injectable({
  providedIn: 'root'
})
export class WordsService {

  headers = {
    'Authorization': 'Bearer ' + this.api.getAccessToken(),
    'Content-Type': 'application/json',
  }
  
  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private errorsService: ErrorsService
  ) { }

  createWord(wordForm: any): Promise<any> {

    return new Promise((resolve, reject) => {

      this.api.post('gamelevel/word', wordForm, this.headers)
        .subscribe((response: any) => {
          this.translate.get('words.word').subscribe((word: string) => {
            this.translate.get('successResponse.created').subscribe((message: string) => {
              this.toastr.success(`${word} ${message}`, 'Error');
            });
          });
          resolve(response);
        }, (error: any) => {
          this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
            this.toastr.error(res, 'Error');
          });
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
          this.translate.get('words.word').subscribe((word: string) => {
            this.translate.get('successResponse.created').subscribe((message: string) => {
              this.toastr.success(`${word} ${message}`, 'Error');
            });
          });
          resolve(response);
        }, (error: any) => {
          if(error.error.message[0].includes('duplicate key') == true){
            this.translate.get('words.word').subscribe((word: string) => {
              this.translate.get('errorResponse.alreadyExists').subscribe((message: string) => {
                this.toastr.success(`${word} ${message}`, 'Error');
              });
            });
          } else {
            this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
              this.toastr.error(res, 'Error');
            });
          }
          reject(error);
        });
    });
  }

  // Get News to server
  getAllWords(): Promise<any> {
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
          this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
            this.toastr.error(res, 'Error');
          });
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
          this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
            this.toastr.error(res, 'Error');
          });
          reject(error);
        });
    });
  }

  //recuperer les informations d'un utilisateur
  getWordListBylevel(levelId, isRefresh?: boolean): Promise<any> {
    if (isRefresh) {
      return new Promise<any>((resolve, reject) => {
        this.api.get(`gamelevel/${levelId}/words`, this.headers)
          .subscribe(response => {
            localStorage.setItem(levelId, JSON.stringify(response.data));
            resolve(response.data);
          }, error => {
            this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
              this.toastr.error(res, 'Error');
            });
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
              this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
                this.toastr.error(res, 'Error');
              });
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
          this.translate.get('words.word').subscribe((word: string) => {
            this.translate.get('successResponse.deleted').subscribe((message: string) => {
              this.toastr.success(`${word} ${message}`, 'Error');
            });
          });
          resolve(response);
        }, error => {
          this.translate.get('errorResponse.unexpectedError').subscribe((res: string) => {
            this.toastr.error(res, 'Error');
          });
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
