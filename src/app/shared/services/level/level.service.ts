import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, concatMap, map, switchMap, tap } from 'rxjs';
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

  // deleteLevelId(levelDataId) {
  //   return new Promise((resolve, reject) => {
  //     this.api.delete(`gamelevel/${levelDataId}`, this.headers).subscribe(
  //       (response) => {
  //         console.log('Level deleted', response);
  //         if (response.statusCode === 200) {
  //           this.toastr.success(
  //             'Level has been deleted successfully',
  //             'Success',
  //             { timeOut: 5000 }
  //           );
  //         }
  //         resolve(response);
  //       },
  //       (error) => {
  //         this.errorsService.errorsInformations(error, 'delete level');
  //         reject(error);
  //       }
  //     );
  //   });
  // }

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



  // findLevelById(levelListItem: Level[], levelId: string): Level | undefined {
  //   let compteur: number;
  //   for (compteur = 0; compteur < levelListItem.length; compteur++) {
  //     if (levelListItem[compteur]._id === levelId) {
  //       return levelListItem[compteur];
  //     }
  //   }
  // }

   // transferWords(oldLevelId: string, newLevelId: string): void {
  //   // Récupérer les mots associés à l'ancien niveau
  //   this.http.get<any>(`https://asdesmots-api.yaba-in.com/gamelevel/${oldLevelId}/words`, this.httpOptions).subscribe(data => {
  //     console.log("réponse serveur à la récupération des mots du niveau à supprimer: ", data);
  //     this.allWords = Array.from(data.data);
  //     console.log("mots récupérés: ", this.allWords);

  //     // Récupérer tous les niveaux
  //     this.http.get<any>('https://asdesmots-api.yaba-in.com/gamelevel', this.httpOptions).subscribe(response => {
  //       console.log("réponse serveur à la récupération de tous les niveaux: ", response);
  //       this.allLevels = Array.from(response.data);
  //       console.log("niveaux récupérés: ", this.allLevels);

  //       // Rechercher le niveau spécifique en fonction de son identifiant
  //       const specificLevel = this.allLevels.find((level) => level._id === newLevelId);
  //       console.log("niveau spécifique trouvé avec ses informations de base: ", specificLevel);
  //       console.log("taille de specificLevel avant ajout des mots du niveau à supprimer: ", specificLevel.words.length);

  //       // Ajouter les mots du niveau à supprimer au niveau spécifique
  //       this.allWords.forEach(word => {
  //         specificLevel.words.push(word._id);
  //       });

  //       console.log("les nouvelles informations sur specificLevel: ", specificLevel);
  //       console.log("taille de specificLevel après ajout des mots du niveau à supprimer: ", specificLevel.words.length);
  //     });
  //   });
  // }

  // transferWords(oldLevelId: string, newLevelId: string): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     // Récupérer les mots associés à l'ancien niveau
  //     this.api.get(`gamelevel/${oldLevelId}/words`, this.headers)
  //       .subscribe(data => {
  //         console.log("réponse serveur à la récupération des mots du niveau à supprimer: ", data);
  //         this.allWords = Array.from(data.data);
  //         console.log("mots récupérés: ", this.allWords);

  //         // Récupérer tous les niveaux
  //         this.api.get('gamelevel', this.headers)
  //           .subscribe(response => {
  //             console.log("réponse serveur à la récupération de tous les niveaux: ", response);
  //              this.allLevels = Array.from(response.data);
  //             console.log("niveaux récupérés: ", this.allLevels);

  //             // Rechercher le niveau spécifique en fonction de son identifiant
  //             const specificLevel = this.allLevels.find((level) => level._id === newLevelId);
  //             console.log("niveau spécifique trouvé avec ses informations de base: ", specificLevel);
  //             console.log("taille de specificLevel avant ajout des mots du niveau à supprimer: ", specificLevel.words.length);

  //             // Ajouter les mots du niveau à supprimer au niveau spécifique
  //             this.allWords.forEach(word => {
  //               specificLevel.words.push(word._id);
  //             });

  //             console.log("les nouvelles informations sur specificLevel: ", specificLevel);
  //             console.log("taille de specificLevel après ajout des mots du niveau à supprimer: ", specificLevel.words.length);

  //             this.api.delete(`gamelevel/${oldLevelId}`, this.headers)
  //               .subscribe(
  //                 (response) => {
  //                   console.log('Level deleted mamelem', response);
  //                   if (response.statusCode === 200) {
  //                     this.toastr.success(
  //                       'Level has been deleted successfully',
  //                       'Success',
  //                       { timeOut: 5000 }
  //                     );
  //                   }
  //                   resolve(response);
  //                 },
  //                 (error) => {
  //                   this.errorsService.errorsInformations(error, 'delete level');
  //                   reject(error);
  //                 }
  //               );
  //           });
  //       });
  //   });
  // }

  // transferWords(oldLevelId: string, newLevelId: string): Observable<any> {
  //   // Récupérer les mots associés à l'ancien niveau
  //   const words$ = this.http.get<any>(`https://asdesmots-api.yaba-in.com/gamelevel/${oldLevelId}/words`, this.httpOptions)
  //     .pipe(
  //       tap(data => console.log("Mots récupérés :", data)),
  //       map(data => Array.from(data.data))
  //     );

  //   // Récupérer tous les niveaux
  //   const levels$ = this.http.get<any>('https://asdesmots-api.yaba-in.com/gamelevel', this.httpOptions)
  //     .pipe(
  //       tap(response => console.log("Niveaux récupérés :", response)),
  //       map(response => Array.from(response.data))
  //     );

  //   return forkJoin([words$, levels$]).pipe(
  //     tap(([words, levels]) => {
  //       // Rechercher le niveau spécifique en fonction de son identifiant
  //       const specificLevel = levels.find(level => level._id === newLevelId);

  //       console.log("Taille de specificLevel avant ajout des mots :", specificLevel.words.length);
  //       console.log("Informations avant ajout de specificLevel :", specificLevel);

  //       // Ajouter les mots du niveau à supprimer au niveau spécifique
  //       words.forEach(word => {
  //         specificLevel.words.push(word._id);
  //       });

  //       console.log("Taille de specificLevel après ajout des mots :", specificLevel.words.length);
  //       console.log("Informations de specificLevel après ajout :", specificLevel);

  //       // Supprimer l'ancien niveau
  //       return this.http.delete<any>(`https://asdesmots-api.yaba-in.com/gamelevel/${oldLevelId}`, this.httpOptions).pipe(
  //         map(() => specificLevel)
  //       );
  //     })
  //   );
  // }

  transferWords(oldLevelId: string, newLevelId: string): Promise<any> {
    return this.http.get<any>(`https://asdesmots-api.yaba-in.com/gamelevel/${oldLevelId}/words`, this.httpOptions)
      .pipe(
        tap(data => console.log("Réponse serveur à la récupération des mots du niveau à supprimer :", data)),
        map(data => Array.from(data.data)),
        switchMap(words => {
          this.allWords = words;
          console.log("Mots récupérés :", this.allWords);
          return this.http.get<any>('https://asdesmots-api.yaba-in.com/gamelevel', this.httpOptions);
        }),
        tap(response => console.log("Réponse serveur à la récupération de tous les niveaux :", response)),
        map(response => Array.from(response.data)),
        tap(levels => {
          this.allLevels = levels;
          console.log("Niveaux récupérés :", this.allLevels);
        }),
        map(() => {
          // Rechercher le niveau spécifique en fonction de son identifiant
          const specificLevel = this.allLevels.find(level => level._id === newLevelId);
          console.log("Niveau spécifique trouvé avec ses informations de base :", specificLevel);
          console.log("Taille de specificLevel avant ajout des mots du niveau à supprimer :", specificLevel.words.length);

          // Ajouter les mots du niveau à supprimer au niveau spécifique
          this.allWords.forEach(word => {
            specificLevel.words.push(word._id);
          });

          console.log("Les nouvelles informations sur specificLevel :", specificLevel);
          console.log("Taille de specificLevel après ajout des mots du niveau à supprimer :", specificLevel.words.length);

          return this.http.delete<any>(`https://asdesmots-api.yaba-in.com/gamelevel/${oldLevelId}`, this.httpOptions)
            .pipe(
              tap(response => {
                console.log('Level deleted:', response);
                if (response.statusCode === 200) {
                  this.toastr.success(
                    'Le niveau a été supprimé avec succès',
                    'Succès',
                    { timeOut: 5000 }
                  );
                }
              })
            )
            .toPromise();
        })
      )
      .toPromise();
  }


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
}
