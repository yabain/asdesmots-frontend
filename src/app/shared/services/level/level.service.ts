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

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private errorsService: ErrorsService
  ) { }

  createLevel(level: Level): Promise<any> {
    return new Promise((resolve, reject) => {

      const headers = {
        'Content-Type': 'application/json',
        // 'X-CSRF-Token': '97dKe-0-qukVOMY1YNBhsZ-POfPUArpL11YLfRJFD94',
        // 'Accept': 'application/json'
      };
      const params = {
        'name': level.name,
        'description': level.description,
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
  updateLevel(levelId: any, levelData?: any): Promise<any> {
    console.log("upsate user: ", levelData);

    return new Promise((resolve, reject) => {

      const headers = {
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
        'Content-Type': 'application/hal+json',
        'Accept': 'application/json',
        'X-CSRF-Token': 'FWjJkOClVTMzyhEPEhz_OPR3PulweXUqi-NePcofKU8' || JSON.parse(localStorage.getItem('app-token'))
      }

      this.params = levelData;

      this.api.put(`gamelevel/${levelId}`, this.params, headers)
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
  getLevelById(id: String): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let level: Level = this.levelList.find((u) => u.id == id);
      if (level != undefined) resolve(level);
      else {
        this.api.get(`user/profil/${id}`, {
          'Authorization': 'Bearer ' + this.api.getAccessToken(),

        }).subscribe(success => {
          resolve(success);
        }, error => {
          this.errorsService.errorsInformations(error, 'get this level');
          reject(error);
        })
      }
    })
  }

  // Get News to server
  getAllLevels(): Promise<any> {
    console.log('Get all levels.')
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.api.getAccessToken(),
      };

      console.log('Get all level 2.')
      this.api.get('gamelevel', headers)
        .subscribe(result => {
          let tab: any = result.data;
          for (let i = 0; i < tab.length; i++) {
            tab[i] = this.parseLevelFromApi(tab[i]);
            console.log('level ', i, ': ', tab[i]);
          }
          localStorage.setItem("levels-list", JSON.stringify(tab));
          resolve(result);
        }, error => {
          this.errorsService.errorsInformations(error, 'get level list', '0')
            reject(error);
        });
    });
  }


  parseLevelFromApi(levelApiData: Record<string | number, any>): Level {
    let level: Level = new Level();
    level.id = levelApiData._id;
    level.name = levelApiData.name;
    level.description = levelApiData.description;

    return level;
  }
}
