import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Component, OnInit } from '@angular/core';
import { ArcardeService } from '../services/arcarde.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-list-user-arcarde',
  templateUrl: './list-user-arcarde.component.html',
  styleUrls: ['./list-user-arcarde.component.css']
})
export class ListUserArcardeComponent implements OnInit {
  idArcard: string = '';


  constructor(public arcardeServ: ArcardeService,
              private translate: TranslateService,
              private translation: TranslationService,
              private router: Router,
              private activedRouter: ActivatedRoute) {
             this.initTranslation();
            //  this.getId();
      }

  ngOnInit(): void {
    this.idArcard = this.activedRouter.snapshot.params['idArcarde'];
    this.arcardeServ.getListUsersOfArcardes(this.idArcard);
  }

  initTranslation(){
      this.translate.use(this.translation.getLanguage());
  }

  goToAcradeSuscription(){
    this.router.navigateByUrl('/arcarde/suscribe');
 }

//  refresh(){
//   this.arcardeServ.loadArcade();
// }


  // getId(){
  //     this.idArcard = this.activedRouter.snapshot.params['idArcarde'];
  //     this.arcardeServ.getListUsersOfArcardes(this.idArcard);
  // }


  // getId(){
  //     this.idArcard = this.activedRouter.snapshot.params['idArcarde'];
  //     console.log("werrr", this.idArcard)
  //     this.arcardeServ.getListUsersOfArcardes(this.idArcard);
  // }

  refresh() {
    this.arcardeServ.getListUsersOfArcardes(this.idArcard);
  }

  removeUser(userId: string) {
    this.arcardeServ.UnsuscribeUserToAcarde({
      gameID: this.idArcard,
      playerID: userId
    });
    this.refresh()
  }

}
