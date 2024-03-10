import { Component, OnInit } from '@angular/core';
import { ArcardeService } from '../services/arcarde.service';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-arcadesuscription',
  templateUrl: './arcadesuscription.component.html',
  styleUrls: ['./arcadesuscription.component.css']
})
export class ArcadesuscriptionComponent implements OnInit {
  arcardeData : Arcarde = new Arcarde();
  constructor(
    public arcadeServ: ArcardeService,
    public userServ:  UserService,
    private location: Location,
    private translate: TranslateService,
    private translation: TranslationService
  ) {
      this.arcadeServ.initFormControl();
      this.loadAllArcarde();
      this.translate.use(this.translation.getLanguage());
  }

  ngOnInit(): void {
  }



  loadAllArcarde(){
    if(this.arcadeServ.listAllArcarde.length == 0){
        this.arcadeServ.loadAllArcarde();
    }
  }

  refresh(){
    this.arcadeServ.loadAllArcarde();
  }

  doSuscription(){
      this.arcadeServ.f['gameID'].setValue(this.arcardeData._id);
      this.arcadeServ.f['playerID'].setValue(this.userServ.getLocalStorageUser()._id);
      this.arcadeServ.addUserToAccarde();
  }

  loadLocation(data: any){
      this.arcardeData = data;
      this.arcadeServ.loadLocalisationOfCompetition(this.arcardeData._id);
  }

  backClicked(){
      this.location.back();
  }

  reset(){
      this.arcadeServ.formControlSuscription.reset();
      this.arcadeServ.suscriptionDone = false;
  }


}
