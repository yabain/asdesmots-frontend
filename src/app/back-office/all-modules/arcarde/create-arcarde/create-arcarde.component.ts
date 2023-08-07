import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ArcardeService } from '../services/arcarde.service';

@Component({
  selector: 'app-create-arcarde',
  templateUrl: './create-arcarde.component.html',
  styleUrls: ['./create-arcarde.component.css']
})
export class CreateArcardeComponent implements OnInit {
  arcardeData : Arcarde = new Arcarde();
  constructor(public arcadeServ: ArcardeService, 
              private translate: TranslateService,
              public userServ:  UserService,
              private router: Router,
              private translationService: TranslationService,  
              ) { this.arcadeServ.initFormControl(); this.arcadeServ.initFormCreationArcarde()}

  ngOnInit(): void {
  }

  createArcarde(){
    if(this.arcadeServ.formControlCreateArcarde.valid){
      this.arcadeServ.createNewArcarde()

    }
   }

    resetFormCreation(){
      this.arcadeServ.formControlCreateArcarde.reset();
      this.arcadeServ.isCreationDone = false;
   }
  

}
