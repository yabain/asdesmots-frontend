import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ArcardeService } from '../services/arcarde.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-arcarde',
  templateUrl: './create-arcarde.component.html',
  styleUrls: ['./create-arcarde.component.css']
})
export class CreateArcardeComponent implements OnInit {
  arcardeData : Arcarde = new Arcarde();
  createForm: FormGroup;
  constructor(
    public arcadeServ: ArcardeService, 
      private translate: TranslateService,
      public userServ:  UserService,
      private router: Router,
      private location: Location,
      private fb: FormBuilder,
      private translationService: TranslationService,  
      ) { 
      this.translate.use(this.translationService.getCurrentLanguage());
      this.arcadeServ.initFormControl(); 
      this.arcadeServ.initFormCreationArcarde()
    }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      isFreeRegistrationPlayer:[''],
      type:[''],
      canRegisterPlayer:[''],
    })
  }

  createArcarde(){
    if(this.arcadeServ.formControlCreateArcarde.valid){
      this.arcadeServ.verificationAndCreateNewArcarde();
    }
  }

  resetFormCreation(){
    this.arcadeServ.formControlCreateArcarde.reset();
    this.arcadeServ.isCreationDone = false;
  }
   
  backClicked(){
    this.resetFormCreation();
    this.location.back();
  }
}
