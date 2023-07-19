import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorsService } from 'src/app/shared/services/errors/errors.service';
import { Level } from 'src/app/shared/entities/level';



@Injectable({
  providedIn: 'root'
})
export class LevelService {

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
    }
  ];
  result: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private errorsService: ErrorsService
  ) {

  }

  createLevel(level): Promise<any> {
    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
      };

      const params = {
        'name': level.name,
        'description': level.description,
      };

      this.api.post('gamelevel', params, headers)
        .subscribe((response: any) => {
          this.getAllLevels();
          if (response.statusCode === 201) {
            this.toastr.success("Level has been created successfully", 'Success', { timeOut: 5000 });
          }
          resolve(response);
        }, (error: any) => {
          this.errorsService.errorsInformations(error, "create level");
          reject(error);
        });
    });

  }

  deleteLevel(level): Promise<any> {
    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
      };

      const params = {
        'gamelevelID': level._id,
      };

      this.api.delete(`gamelevel/${level._id}`, headers)
        .subscribe((response: any) => {
          console.log('Level deleted', response);
          this.getAllLevels();
          if (response.statusCode === 200) {
            this.toastr.success("Level has been deleted successfully", 'Success', { timeOut: 5000 });
          }
          resolve(response);
        },(error: any) => {
          this.errorsService.errorsInformations(error, "delete level");
          reject(error);
        });
    });

  }

  // permet d'update les infos d'un user
  updateLevel(levelId: any, levelData?: any): Promise<any> {
    console.log("upsate user: ", levelData);

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
      }

      this.params = levelData;

      this.api.put(`gamelevel/${levelId}`, this.params, headers)
        .subscribe((response: any) => {
          this.getAllLevels();
          if (response.statusCode === 201) {
            this.toastr.success("Your account has been created. You will receive a confirmation email.", 'Success', { timeOut: 7000 });
          }
          console.log("respose: ", response)
          resolve(response);
        }, (error: any) => {
          this.errorsService.errorsInformations(error, "update level", '0')
          reject(error);
        });
    });
  }

  //recuperer les informations d'un utilisateur
  getLevelById(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let level: Level = JSON.parse(localStorage.getItem('levels-list')).find((u) => u._id == id);
      if (level != undefined) resolve(level);
      else {
        this.api.get(`gamelevel/${id}`, {
          'Authorization': 'Bearer ' + this.api.getAccessToken(),

        }).subscribe(success => {
          localStorage.setItem(id, JSON.stringify(success.data));
          resolve(success.data);
        }, error => {
          console.log(error);
          this.errorsService.errorsInformations(error, 'get level', '0');
          reject(error);
        })
      }
    })
  }

  // Get News to server
  getAllLevels(): Promise<any> {

    return new Promise((resolve, reject) => {
      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/json',
      };

      this.api.get('gamelevel', headers)
        .subscribe(result => {
          // result.data = this.levelListfixed; // prendre les valeurs statique de levelListFixed car aucune valeurs venant du backend
          this.levelList = result.data;
          console.log("resultat de get list: ", result.data);
          // let tab: any = result.data;
          // for (let i = 0; i < tab.length; i++) {
          //   tab[i] = this.parseLevelFromApi(tab[i]);
          //   console.log('level ', i, ': ', tab[i]);
          // }
          localStorage.setItem("levels-list", JSON.stringify(this.levelList));
          resolve(result.data);
        }, error => {
          this.errorsService.errorsInformations(error, 'get level list', '0')
          reject(error);
        });
    });
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
