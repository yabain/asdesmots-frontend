import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import { GamePart } from 'src/app/shared/entities/gamePart.model';
import { EndpointGamePart } from './Endpoint';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Injectable({
  providedIn: 'root'
})
export class GamePartsService {

  dateNow:Date;

  listGameParts: GamePart[] = [
   /* {
      _id: 'jjsdsdsds',
      name: 'Parts 1',
      description: 'une description',
      gameLevel: {
        name: 'Start'
      },
      maxPlayersNumber: 10,
      numberOfWord: 10,
      startDate: '10/02/2023',
      endDate: '10/03/2023'
    },
    {
      _id: 'jjsdsdsds',
      name: 'Parts 2',
      description: 'une description',
      gameLevel: {
        name: 'Start'
      }
    },
    {
      _id: 'jjsdsdsds',
      name: 'Parts 3',
      description: 'une description',
      gameLevel: {
        name: 'Start'
      }
    }*/
  ]
  waitingResponse: boolean = false;
  gamePartForm : FormGroup;
  authorization: any;

  partAdded : boolean = false;
  partDeletingDone : boolean = false;

  constructor( 
        private api: ApiService,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private languageService: TranslationService
  ) { this.authorization = {  'Authorization': 'Bearer ' + this.api.getAccessToken() } }
  
  get f(){
    return this.gamePartForm.controls;
  }

  initForm(){
    this.gamePartForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        gameCompetitionID: ['', Validators.required],
        numberOfWord: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
    });
    
  }

  checkDateGamePartAndAddGamePart() {
    const newStartDate = new Date(this.gamePartForm.value.startDate);
    if ( this.dateNow > newStartDate ) {
      return this.toastr.error(this.languageService.transformMessageLanguage("logiqueDatOne"), this.languageService.transformMessageLanguage('error'), { timeOut: 5000 });
    }
    else if( this.gamePartForm.value.endDate < this.gamePartForm.value.startDate ) {
      return this.toastr.error(this.languageService.transformMessageLanguage("logiqueDatTwo"), this.languageService.transformMessageLanguage('error'), { timeOut: 5000 });
    }
    else if( this.gamePartForm.value.name.length < 4 ) {
      return this.toastr.error(this.languageService.transformMessageLanguage("minLengthDtl"), this.languageService.transformMessageLanguage('error'), { timeOut: 5000 });
    }
    else if( this.gamePartForm.value.description.length < 4 ) {
      return this.toastr.error(this.languageService.transformMessageLanguage("minLengthDtl"), this.languageService.transformMessageLanguage('error'), { timeOut: 5000 });
    }
    else if(this.gamePartForm.value.numberOfWord < 2 ) {
      return this.toastr.error(this.languageService.transformMessageLanguage("numberOfWord"), this.languageService.transformMessageLanguage('error'), { timeOut: 5000 });
    }
    else {
      this.AddGamePart();
    }
  }

  AddGamePart(){
    this.waitingResponse = true;
    this.partAdded = false;
    this.api.post(EndpointGamePart.CREATE_PART, this.gamePartForm.value, this.authorization).subscribe((resp)=>{
            this.waitingResponse = false;
            this.toastr.success('Part Added', 'SUCCESS', {timeOut: 7000});
            this.partAdded = true;
    }, (error: any)=>{
      if (error.status == 500) {
        this.toastr.error(this.languageService.transformMessageLanguage('internalError'), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
      } else if (error.status == 401) {
        this.toastr.error(this.languageService.transformMessageLanguage("refreshPage"), this.languageService.transformMessageLanguage('offSession'), { timeOut: 10000 });
      } else {
        this.toastr.error(this.languageService.transformMessageLanguage('keyDuplicate'), this.languageService.transformMessageLanguage('error'), { timeOut: 7000 });
      }
      this.partAdded = false;
      this.waitingResponse = false;
    })
  }

  deleteGamePart(requestBody: {competitionID: string, gamePartID: string }){
      this.waitingResponse = true;
      this.partDeletingDone = false;
      this.api.delete(EndpointGamePart.DELETE_PART+requestBody.competitionID+'/'+requestBody.gamePartID, this.authorization).subscribe((resp)=>{
              this.deleteOnList(requestBody.gamePartID);
              this.waitingResponse = false;
              this.toastr.success('Part Deleted', 'SUCCESS', { timeOut: 7000 });
              this.partDeletingDone = true;
      }, (error)=>{
        if (error.status == 500) {
          this.toastr.error(this.languageService.transformMessageLanguage('internalError'), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error(this.languageService.transformMessageLanguage("refreshPage"), this.languageService.transformMessageLanguage('offSession'), { timeOut: 10000 });
        } else {
          this.toastr.error(error.message, this.languageService.transformMessageLanguage('error'), { timeOut: 7000 });
        }
        this.waitingResponse = false;
        this.partDeletingDone = false;
      
      });
  }

  deleteOnList(idPart: string){
      const index = this.listGameParts.findIndex((part)=> part._id === idPart);
      if(index != -1){
          this.listGameParts.splice(index, 1);
      }
  }

  getListGamePart(id: string){
      this.waitingResponse = true;

      this.api.get(EndpointGamePart.GET_LIST+id, this.authorization).subscribe((data: any)=>{
          this.listGameParts = Array.from(data.data);
          this.waitingResponse = false;
      }, (error)=>{
        if (error.status == 500) {
          this.toastr.error(this.languageService.transformMessageLanguage('internalError'), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error(this.languageService.transformMessageLanguage("refreshPage"), this.languageService.transformMessageLanguage('offSession'), { timeOut: 10000 });
        } else {
          this.toastr.error(error.message, this.languageService.transformMessageLanguage('error'), { timeOut: 7000 });
        }
        this.waitingResponse = false;
      
      });
  }
}
