import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Component, OnInit } from '@angular/core';
import { ArcardeService } from '../services/arcarde.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

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
              private location: Location,
              private activedRouter: ActivatedRoute) {
             this.initTranslation();
             this.getId();
      }

  ngOnInit(): void {

  }

  initTranslation(){
      this.translate.use(this.translation.getLanguage());
  }
  getId(){
      this.idArcard = this.activedRouter.snapshot.params['id'];
      this.arcardeServ.getListUsersOfArcardes(this.idArcard);
  }


  backClicked(){
    this.location.back();
  }

}
