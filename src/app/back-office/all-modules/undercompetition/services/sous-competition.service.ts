import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { EndpointSousCompetion } from './Endpoint';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArcardeService } from '../../arcarde/services/arcarde.service';
import { WinnigsCriterias } from 'src/app/shared/entities/winnigCriterias';

@Injectable({
  providedIn: 'root'
})
export class SousCompetitionService {
  waitingResponse: boolean = false;
  creationDone: boolean = false;
  listUnderCompetition: SousCompetion[] = [];

  listCompetionParent: any[] = [];

  newUnderCompetionParam : SousCompetion = new SousCompetion();
  listCompetionLocation: string[] = [];

  form : FormGroup;//created
  formUpdate: FormGroup;
  tmpIDLevel: string ='';

  authorization : any;

  listWinningCriterias: WinnigsCriterias[] = [];
  waitingCriteriasResp: boolean = false;
  waitingCriteriasAdd : boolean = false;
  creteriaDeletingDone : boolean = false;

  constructor(private api: ApiService,
               private toastr: ToastrService,
               private arcardeService: ArcardeService,
               private fb: FormBuilder 
               ) { this.authorization = {  'Authorization': 'Bearer ' + this.api.getAccessToken() } }

  get f(){
      return this.form.controls;
  }

  get formUpdt(){
      return this.formUpdate.controls;
  }

  initFormUpdate(){
    this.formUpdate = this.fb.group({
        name : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])],
        description : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(65)])],
        gameLevel : ['', Validators.required],
        isSinglePart : ['', Validators.required],
        canRegisterPlayer: [''],
        localisation: ['', Validators.required],
        maxPlayerLife: ['', Validators.required],
        maxTimeToPlay: ['', Validators.required],
        startDate : ['', Validators.required],
        endDate: ['', Validators.required],
        maxOfWinners: ['', Validators.required],
        lang: ['', Validators.required],
        parentCompetition : ['', Validators.required],
       
    });

    this.formUpdate.valueChanges.subscribe((data: any)=>{
        Object.assign(this.newUnderCompetionParam, data);
    });

  }

 

  initUpdatingValues(data: SousCompetion){
      /*this.formUpdate.controls['name'].setValue(data.name);
      this.formUpdate.controls['description'].setValue(data.description);
      this.formUpdate.controls['level'].setValue(data.level);
      this.formUpdate.controls['isSinglePart'].setValue(data.isSinglePart);
      this.formUpdate.controls['canRegisterPlayer'].setValue(data.canRegisterPlayer);
      this.formUpdate.controls['localisation'].setValue(data.localisation);
      this.formUpdate.controls['maxPlayerLife'].setValue(data.maxPlayerLife);
      this.formUpdate.controls['maxTimeToPlay'].setValue(data.maxTimeToPlay);
      this.formUpdate.controls['startDate'].setValue(data.startDate);
      this.formUpdate.controls['endDate'].setValue(data.endDate);
      this.formUpdate.controls['maxOfWinners'].setValue(data.maxOfWinners);
      this.formUpdate.controls['lang'].setValue(data.lang);
      this.formUpdate.controls['parentCompetition'].setValue(data.parentCompetition);
     */

      this.formUpdate.patchValue(
        {
          name: data.name,
          description: data.description,
          gameLevel: data.gameLevel,
          isSinglePart: data.isSinglePart,
          canRegisterPlayer: data.canRegisterPlayer,
          localisation: data.localisation,
          maxPlayerLife: data.maxPlayerLife,
          maxTimeToPlay: data.maxTimeToPlay,
          startDate: data.startDate,
          endDate: data.endDate,
          maxOfWinners: data.maxOfWinners,
          lang: data.lang,
          parentCompetition: data.parentCompetition
        }
      )
      console.log('datacompetition init ', this.newUnderCompetionParam);
  }

  initFormControl(){
    //control creation new under competition
    this.form = this.fb.group({
        name : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])],
        description : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(65)])],
        gameLevel : ['', Validators.required],
        isSinglePart : ['', Validators.required],
        canRegisterPlayer: [''],
        localisation: ['', Validators.required],
        maxPlayerLife: ['', Validators.required],
        maxTimeToPlay: ['', Validators.required],
        startDate : ['', Validators.required],
        endDate: ['', Validators.required],
        maxOfWinners: ['', Validators.required],
        lang: ['', Validators.required],
        parentCompetition : [''],
        //gameWinnerCriterias : ['', Validators.required],
        //gameJudgesID: ['', Validators.required],
       // gameParts : ['', Validators.required]
    });
    this.initBooleanValues();
    this.form.valueChanges.subscribe((data: any)=>{
        Object.assign(this.newUnderCompetionParam, data);
      
    });


  }

  initBooleanValues(){
    this.form.controls['isSinglePart'].setValue(false);
    this.form.controls['canRegisterPlayer'].setValue(false);
  }
  createCompetition(competionData: SousCompetion, dataArcarde: any){
     
      this.waitingResponse = true;
      this.creationDone = false;

      this.api.post(EndpointSousCompetion.CREATED_NEW_S_C+dataArcarde.idArcarde, competionData, this.authorization).subscribe((resp)=>{
          this.arcardeService.loadArcade();
          this.loadListUnderCompetition();
          this.toastr.success('Competion Created', 'Success', { timeOut: 7000 });
          this.waitingResponse = false;
          this.creationDone = true;
      },(error: any) => {
          
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        } else if (error.status == 404) {
          this.toastr.error("Game Arcarde not found", 'Error', { timeOut: 10000 });
        } else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
        this.waitingResponse = false;
      });
  }

 
  update(idCompetition: string){

      this.waitingResponse = true;
      this.api.put(EndpointSousCompetion.UPDATE_S_C+idCompetition, this.newUnderCompetionParam, this.authorization).subscribe((resp)=>{
          console.log('update response', resp);
          this.toastr.success('Update Done ', 'SUCCESS', {timeOut : 7000});
          this.waitingResponse = false;
          this.arcardeService.loadArcade();
      },(error: any) => {
          
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        } else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
        this.waitingResponse = false;
      });
      console.log(this.formUpdate.value);
  }

  loadAllCompetition(){
      //this.waitingResponse = true;
  }

  loadGameCriterias(){
    this.waitingCriteriasResp = true;
    this.api.get(EndpointSousCompetion.WINNINGS_CRITERIAS, this.authorization).subscribe((resp)=>{
          this.waitingCriteriasResp = false;
          this.listWinningCriterias = Array.from(resp.data);
      }, (error: any)=> {
          
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        } else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
        this.waitingCriteriasResp = false;
        });
  }

  getCompetionWiningsCriteria(idCompetition: string): Promise<WinnigsCriterias[]>{
    this.waitingCriteriasResp = true;
    return new Promise((resole, reject)=>{
          this.api.get(EndpointSousCompetion.GAME_LIST_WINNINGS_CRITERIAS+idCompetition, this.authorization).subscribe((resp)=>{
            this.waitingCriteriasResp = false;
            resole(resp.data);
        }, (error: any)=> {

          reject([]);
          if (error.status == 500) {
            this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
          } else if (error.status == 401) {
            this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
          } else {
            this.toastr.error(error.message, 'Error', { timeOut: 7000 });
          }
          this.waitingCriteriasResp = false;
          })
        });
  }

  addCriteria(gameId: string, criteriaId: string[]){
    this.waitingCriteriasAdd = true;
    const requestBody = { gameID: gameId, gammeWinnersID: criteriaId }

    this.api.put(EndpointSousCompetion.ADD_CRITERIAS_GAME, requestBody, this.authorization).subscribe((resp)=>{
        this.waitingCriteriasAdd = false;
        this.toastr.success('Criteria Add', 'SUCCESS', {timeOut: 7100});
    }, (error: any)=>{
      if (error.status == 500) {
        this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
      } else if (error.status == 401) {
        this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
      } else {
        this.toastr.error(error.message, 'Error', { timeOut: 7000 });
      }
      this.waitingCriteriasAdd = false;
    })
  }

  removeWinningCriteria(gameId: string , gammeCriteriasId: string[]){
      this.waitingCriteriasResp = true;
      const requestBody = { gameID: gameId, gammeWinnersID: gammeCriteriasId }
      console.log('request', requestBody)
      this.api.delete(EndpointSousCompetion.REMOVE_GAME_CRITERIAS, this.authorization, requestBody).subscribe((resp:any)=>{
            this.waitingCriteriasResp = false;
            this.toastr.success('Delete Done', 'SUCCESS', { timeOut: 7000 });
      }, (error: any)=>{
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        } else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
        this.waitingCriteriasResp = false;
      })
  }

  buildListParentCompetition(id_arcarde: number){
    const index = this.arcardeService.listArcardeUser.findIndex((arcarde)=> arcarde._id == id_arcarde);
      if(index != -1){
        this.listCompetionParent = this.arcardeService.listArcardeUser[index].competitionGames;

      }
  }

  loadListUnderCompetition(){
      this.listUnderCompetition = Array.from(this.arcardeService.listUnderCompetion);
  }

  getData(id: any){
      const index = this.listUnderCompetition.findIndex((compet)=> compet._id === id);
      if(index != -1){
          return this.listUnderCompetition[index];
      }
      return new SousCompetion();
  }
}
