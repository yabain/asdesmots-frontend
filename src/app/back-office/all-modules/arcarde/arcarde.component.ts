import { Component, OnInit } from '@angular/core';
import { ArcardeService } from './services/arcarde.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-arcarde',
  templateUrl: './arcarde.component.html',
  styleUrls: ['./arcarde.component.css']
})
export class ArcardeComponent implements OnInit {
  arcardeData : Arcarde = new Arcarde();
  constructor(public arcadeServ: ArcardeService, 
              private translate: TranslateService,
              public userServ:  UserService,
              private translationService: TranslationService,  
              ) { this.arcadeServ.initFormControl(); this.arcadeServ.initFormCreationArcarde()}

  ngOnInit(): void {
    this.loadArcardeCurrentUser();
   // this.loadAllArcarde();
    setTimeout(()=>{
        this.loadAllUser();
    }, 2500);
  }

  loadArcardeCurrentUser(){
      if(this.arcadeServ.listArcardeUser.length == 0){
            this.arcadeServ.loadArcade();//user arcarde
      }
  }

  loadAllArcarde(){
      if(this.arcadeServ.listAllArcarde.length == 0){
          this.arcadeServ.loadAllArcarde();
      }
  }

  async loadAllUser(){
    if(this.userServ.listUsers.length == 0){
        this.userServ.getAllUsers();
    }
  }

  doSuscription(){
      //this.arcadeServ.addUserToAccarde();
      console.log(this.arcadeServ.souscriptionParam);
  }

  doUnsuscription(){
     this.arcadeServ.UnsuscribeUserToAcarde({ userID: this.userServ.getLocalStorageUser()._id, gameID: this.arcardeData._id});
   }

   createArcarde(){
    if(this.arcadeServ.formControlCreateArcarde.valid){
      this.arcadeServ.createNewArcarde()

    }
   }

   doDelete(){
      this.arcadeServ.deleteArcarde(this.arcardeData._id);
   }

   resetFormCreation(){
      this.arcadeServ.formControlCreateArcarde.reset();
      this.arcadeServ.isCreationDone = false;
   }

   resetFormSuscribtion(){
      this.arcadeServ.formControlSuscription.reset();
      this.arcadeServ.unsuscriptionDone = false;
   }

   refresh(){
      this.arcadeServ.loadArcade();
   }

}
