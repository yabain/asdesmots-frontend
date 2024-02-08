import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, concatMap } from 'rxjs';
import { ErrorsService } from 'src/app/shared/services/errors/errors.service';
import { Level } from 'src/app/shared/entities/level';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Word } from '../../entities/word';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  wordData = {
    id: '',
    name: '',
    description: '',
    createdAt: '',
    type: '',
  };

  allWords: any[] = []; // Variable pour stocker les mots associés au niveau sélectionné
  allLevels: any[] = [];
  wordInstance = new Word(this.wordData);
  params: any;
  levelData: any;

  levelList: Level[] = [];
  levelListfixed: Level[] = [
    {
      _id: 'jfhdsjklfghdskflhd',
      name: 'Débutant',
      description: 'Ici la description du niveau débutant',
      words: ['80', '81', '82', '83', '84', '85'],
      createAt: '25/01/2015',
    },
    {
      _id: 'jfhdsjklfghdskflhd',
      name: 'Intermeriaire',
      description: 'Ici la description du niveau Intermeriaire',
      words: ['80', '81', '82', '83', '84', '85'],
      createAt: '25/01/2095',
    },
    {
      _id: 'dghghghjghjfhj',
      name: 'Advenced',
      description: 'Ici la description du niveau Advenced',
      words: ['80', '81', '82', '83', '84', '85'],
      createAt: '25/01/2085',
    },
  ];
  result: any;

  headers = {
    Authorization: 'Bearer ' + this.api.getAccessToken(),
    'Content-Type': 'application/json',
  };

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.api.getAccessToken(),
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private errorsService: ErrorsService,
    private http: HttpClient
  ) // private level: Level
  {}

  createLevel(level): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        name: level.name,
        description: level.description,
      };

      this.api.post('gamelevel', params, this.headers).subscribe(
        (response: any) => {
          this.getAllLevels();
          if (response.statusCode === 201) {
            this.toastr.success(
              'Level has been created successfully',
              'Success',
              { timeOut: 5000 }
            );
          }
          resolve(response);
        },
        (error: any) => {
          this.errorsService.errorsInformations(error, 'create level');
          reject(error);
        }
      );
    });
  }

  deleteLevel(level): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        gamelevelID: level.gamelevelID,
        groupHeriterId: level.groupHeriterId,
      };

      this.api.delete(`gamelevel/${level.levelDataId}`, this.headers).subscribe(
        (response: any) => {
          console.log('Level deleted', response);
          this.getAllLevels();
          if (response.statusCode === 200) {
            this.toastr.success(
              'Level has been deleted successfully',
              'Success',
              { timeOut: 5000 }
            );
          }
          resolve(response);
        },
        (error: any) => {
          this.errorsService.errorsInformations(error, 'delete level');
          reject(error);
        }
      );
    });
  }

  // deleteLevelById(gamelevelID: string): void {
  //   this.http
  //     .delete<any>(
  //       `https://asdesmots-api.yaba-in.com/gamelevel/${gamelevelID}`,
  //       this.httpOptions
  //     )
  //     .subscribe(
  //       (response) => {
  //         if (response.status === 200) {
  //           // Supprimer le niveau concerné du localStorage
  //           const levelList = JSON.parse(localStorage.getItem('levellist'));
  //           const updatedLevelList = levelList.filter((level: any) => level.id !== gamelevelID);
  //           localStorage.setItem('levellist', JSON.stringify(updatedLevelList));

  //           this.toastr.success(
  //             'Level has been deleted successfully',
  //             'Success',
  //             { timeOut: 5000 }
  //           );
  //           console.log('Niveau de jeu supprimé avec succès', response);
  //         }
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la suppression du niveau de jeu', error);
  //       }
  //     );
  // }

  //Supprimer un niveau et transférer ses mots dans un autre niveau

  // transferWords(oldLevelId: string, newLevelId: string): void {
  //   // Récupérer les mots associés à l'ancien niveau
  //   this.http.get<any[]>(`https://asdesmots-api.yaba-in.com/gamelevel/${oldLevelId}/words`, this.httpOptions).subscribe(data => {
  //     this.allWords = data;
  //   });

  //   console.log(this.allWords);

  //   this.http.get<any[]>('https://asdesmots-api.yaba-in.com/gamelevel', this.httpOptions).subscribe(response => {
  //     this.allLevels = response;
  // });

  // console.log(this.allLevels);

  // // const levelFilter = this.allLevels.find(level => level._id === newLevelId );
  // // console.log("niveau spécifique"+ levelFilter.name);
  // // levelFilter.words.push(...this.allWords);

  // }

  // findLevelById(levelListItem: Level[], levelId: string): Level | undefined {
  //   let compteur: number;
  //   for (compteur = 0; compteur < levelListItem.length; compteur++) {
  //     if (levelListItem[compteur]._id === levelId) {
  //       return levelListItem[compteur];
  //     }
  //   }
  // }

  // transferWords(oldLevelId: string, newLevelId: string): void {
  //   this.http.get<any[]>(`https://asdesmots-api.yaba-in.com/gamelevel/${oldLevelId}/words`, this.httpOptions).subscribe(data => {
  //     this.allWords = data;
  //     console.log(this.allWords);

  //     this.http.get<any[]>('https://asdesmots-api.yaba-in.com/gamelevel', this.httpOptions).subscribe(response => {
  //       this.allLevels = response;
  //       console.log(this.allLevels);

  //       Rechercher le niveau spécifique en fonction de son identifiant
  //       const specificLevel = this.allLevels.find((level) => level._id === newLevelId);
  //       const specificLevel = this.findLevelById(this.allLevels, newLevelId);
  //       console.log("niveau spécifique: " + specificLevel);
  //       specificLevel.words.push(...this.allWords);
  //       if (specificLevel) {
  //         console.log("Niveau spécifique:", specificLevel);
  //       } else {
  //         console.log("Niveau spécifique non trouvé.");
  //       }

  //       const specificLevel = this.allLevels.find((level) => level._id === newLevelId);
  //         if (specificLevel) {
  //           console.log("Niveau spécifique:", specificLevel);
  //           specificLevel.words.push(...this.allWords);
  //         } else {
  //           console.log("Niveau spécifique non trouvé.");
  //         }

  //       let specificLevel: Level;
  //       for(const level of this.allLevels) {
  //         if(level._id === newLevelId) {
  //           specificLevel = level;
  //           console.log("niveau précis: " + specificLevel);
  //         }
  //       }

  //     });
  //   });
  // }

  // transferWords(oldLevelId: string, newLevelId: string): void {
  //   this.http.get<any[]>(`https://asdesmots-api.yaba-in.com/gamelevel/${oldLevelId}/words`, this.httpOptions).subscribe(data => {
  //     this.allWords = data;

  //     this.http.get<any[]>('https://asdesmots-api.yaba-in.com/gamelevel', this.httpOptions).subscribe(response => {
  //       this.allLevels = response;

  //       const levelFilter = this.allLevels.find(level => level._id === newLevelId);

  //       if (levelFilter) {
  //         console.log("Niveau spécifique : " + levelFilter.name);
  //         // levelFilter.words.push(...this.allWords);
  //       } else {
  //         console.log("Niveau non trouvé.");
  //       }

  //       console.log(this.allWords);
  //       console.log(this.allLevels);
  //     });
  //   });
  // }

  // permet d'update les infos d'un niveau
  updateLevel(levelId: any, levelData?: any): Promise<any> {
    console.log('upsate user: ', levelData);

    return new Promise((resolve, reject) => {
      let params = {
        name: levelData.name,
        description: levelData.description,
      };

      this.api
        .put(`gamelevel/gamelevel/${levelId}`, params, this.headers)
        .subscribe(
          (response: any) => {
            this.getAllLevels();
            if (response.statusCode === 201) {
              this.toastr.success(
                'Your account has been created. You will receive a confirmation email.',
                'Success',
                { timeOut: 7000 }
              );
            }
            console.log('respose: ', response);
            resolve(response);
          },
          (error: any) => {
            this.errorsService.errorsInformations(error, 'update level', '0');
            reject(error);
          }
        );
    });
  }

  //recuperer les informations d'un utilisateur
  getLevelById(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let level: Level = JSON.parse(localStorage.getItem('levels-list')).find(
        (u) => u._id == id
      );
      if (level != undefined) resolve(level);
      else {
        this.api
          .get(`gamelevel/${id}`, {
            Authorization: 'Bearer ' + this.api.getAccessToken(),
          })
          .subscribe(
            (success) => {
              localStorage.setItem(id, JSON.stringify(success.data));
              resolve(success.data);
            },
            (error) => {
              console.log(error);
              this.errorsService.errorsInformations(error, 'get level', '0');
              reject(error);
            }
          );
      }
    });
  }

  // Get News to server
  getAllLevels(refresh?: boolean): Promise<any> {
    if (refresh === true) {
      return new Promise((resolve, reject) => {
        this.api.get('gamelevel', this.headers).subscribe(
          (result) => {
            this.levelList = result.data;
            console.log('refresh resultat de get list: ', result.data);
            localStorage.setItem('levels-list', JSON.stringify(this.levelList));
            resolve(result.data);
          },
          (error) => {
            this.errorsService.errorsInformations(error, 'get level list', '0');
            reject(error);
          }
        );
      });
    } else {
      return new Promise((resolve, reject) => {
        this.levelList = JSON.parse(localStorage.getItem('levels-list'));
        if (this.levelList != undefined) {
          resolve(this.levelList);
        } else {
          this.api.get('gamelevel', this.headers).subscribe(
            (result) => {
              this.levelList = result.data;
              console.log('resultat de get list: ', result.data);
              // let tab: any = result.data;
              // for (let i = 0; i < tab.length; i++) {
              //   tab[i] = this.parseLevelFromApi(tab[i]);
              //   console.log('level ', i, ': ', tab[i]);
              // }
              localStorage.setItem(
                'levels-list',
                JSON.stringify(this.levelList)
              );
              resolve(result.data);
            },
            (error) => {
              this.errorsService.errorsInformations(
                error,
                'get level list',
                '0'
              );
              reject(error);
            }
          );
        }
      });
    }
  }

  parseLevelFromApi(levelApiData: Record<string | number, any>): Level {
    let level: Level = new Level();
    level._id = levelApiData.id;
    level.name = levelApiData.name;
    level.description = levelApiData.description;
    level.words = levelApiData.words;
    level.createAt = levelApiData.createAt;

    return level;
  }

  getWordById(wordId: string) {

  }
}
