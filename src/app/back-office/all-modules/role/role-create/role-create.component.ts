import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

  constructor(public roleService: RoleService,
              private location: Location,
              private translate: TranslateService,
              private translation: TranslationService
              ) { 
      this.roleService.initFormCreatingRole();
      this.initTranslation();
  }

  ngOnInit(): void {

  }

  initTranslation(){
      this.translate.use(this.translation.getCurrentLanguage());
  }

  resetFormCreation(){
    this.roleService.formCreateRole.reset();
    this.roleService.creationDone = false;
  }

  createRole(){
      this.roleService.createRole();
      this.resetFormCreation()
  }

  backClicked(){
      this.location.back();
  }
}
