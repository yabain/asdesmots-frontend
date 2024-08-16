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
  constructor(public arcadeService: ArcardeService, 
              public userService:  UserService,
              ) { }

  ngOnInit(): void {
    this.loadArcardeCurrentUser();
   // this.loadAllArcarde();
    setTimeout(()=>{
        this.loadAllUser();
    }, 2500);
  }

  loadArcardeCurrentUser(){
      if(this.arcadeService.listArcardeUser.length == 0){
            this.arcadeService.loadArcade();//user arcarde
      }
  }

  loadAllArcarde(){
      if(this.arcadeService.listAllArcarde.length == 0){
          this.arcadeService.loadAllArcarde();
      }
  }

  async loadAllUser(){
    if(this.userService.listUsers.length == 0){
        this.userService.getAllUsers();
    }
  }

  doSuscription(){
      //this.arcadeService.addUserToAccarde();
      console.log(this.arcadeService.souscriptionParam);
  }

  doUnsuscription(){
     this.arcadeService.UnsuscribeUserToAcarde({ playerID: this.userService.getLocalStorageUser()._id, gameID: this.arcardeData._id});
   }

   createArcarde(){
    if(this.arcadeService.formControlCreateArcarde.valid){
      // this.arcadeService.createNewArcarde()
    }
   }

   doDelete(){
      this.arcadeService.deleteArcarde(this.arcardeData._id);
   }

   resetFormCreation(){
      this.arcadeService.formControlCreateArcarde.reset();
      this.arcadeService.isCreationDone = false;
   }

   resetFormSuscribtion(){
      this.arcadeService.formControlSuscription.reset();
      this.arcadeService.unsuscriptionDone = false;
   }

   refresh(){
      this.arcadeService.loadArcade();
   }

}
