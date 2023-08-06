import { Component, OnInit } from '@angular/core';
import { ArcardeService } from '../services/arcarde.service';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { UserService } from 'src/app/shared/services/user/user.service';

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
  ) { 
      this.arcadeServ.initFormControl();
      this.loadAllArcarde();
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

  reset(){
      this.arcadeServ.formControlSuscription.reset();
      this.arcadeServ.suscriptionDone = false;
  }
}
