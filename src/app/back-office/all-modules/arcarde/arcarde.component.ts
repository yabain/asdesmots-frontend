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
              ) { this.arcadeServ.initFormControl() }

  ngOnInit(): void {
    this.loadArcardeCurrentUser();

    setTimeout(()=>{
        this.loadAllUser();
    }, 2500);

    console.log('arcarde load');
  }

  loadArcardeCurrentUser(){
    this.arcadeServ.loadArcade();
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
     // this.arcadeServ.UnsuscribeUserToAcarde({ userID: this.userServ.getLocalStorageUser()._id, gameID: this.arcardeData.id, localisation: this.arcardeData.name});
     console.log('user id', this.userServ.getLocalStorageUser()._id)
   }

   refresh(){
      this.arcadeServ.loadArcade();
   }

}
