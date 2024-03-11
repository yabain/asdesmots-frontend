import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { EndpointSousCompetion } from './Endpoint';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArcardeService } from '../../arcarde/services/arcarde.service';
import { WinnigsCriterias } from 'src/app/shared/entities/winnigCriterias';
import { State } from 'src/app/shared/entities/state.enum';
import { User } from 'src/app/shared/entities/user';


@Injectable({
  providedIn: 'root'
})
export class SousCompetitionService {
  waitingResponse: boolean = false;
  creationDone: boolean = false;
  listUnderCompetition: SousCompetion[] = [];

  listCompetionParent: any[] = [];

  newUnderCompetionParam : SousCompetion = new SousCompetion();
  underCompetiton: SousCompetion = new SousCompetion();
  listCompetionLocation: string[] = [];

  form : FormGroup;//created
  formUpdate: FormGroup;
  tmpIDLevel: string ='';

  authorization : any;

  listWinningCriterias: WinnigsCriterias[] = [];
  waitingCriteriasResp: boolean;
  waitingCriteriasAdd : boolean = false ;
  waitingCreteriaDeletingDone : boolean = false ;

  waitingParticipantsResp: boolean;
  waitingParticipantDeletingDone : boolean = false;

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
          startDate: (data.startDate).slice(0,-8),
          endDate: (data.endDate).slice(0,-8),
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

  changeState(data: {gameArcardeID: string, gameCompetitionID: string, state: string }){
    this.waitingResponse = false;
    this.clientChangeState(data.gameArcardeID, State.RUNNING);

    console.log('game competiton id :', data.gameCompetitionID);
    this.api.put(EndpointSousCompetion.COMPETITION_STATE, data, this.authorization).subscribe((response: any)=>{
        this.toastr.success('Competition Started', 'Success', {timeOut: 10000});
        this.clientChangeState(data.gameCompetitionID, State.WAITING_PLAYER);

        this.waitingResponse = false;

    }, (error: any)=>{
      if (error.error.statusCode == 500) {
        this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
      } else if (error.error.statusCode == 401) {
        this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
      } else if(error.error.statusCode == 403) {
        this.toastr.error(error.error.message, 'Error', { timeOut: 10000 });
      } else if (error.error.statusCode == 404) {
        this.toastr.error("Game Arcarde not found", 'Error', { timeOut: 10000 });
      } else {
        this.toastr.error(error.error.message, 'Error1', { timeOut: 7000 });
      }
      this.waitingResponse = false;
    });

}

async clientChangeState(idCompet: string, statut: string){
//change the compett's state on user client (ui)

      const index = this.arcardeService.listUnderCompetion.findIndex(compet => compet._id === idCompet);
      if(index != -1){
        this.arcardeService.listUnderCompetion[index].gameState = statut;
      }
}

  createCompetition(competionData: SousCompetion, dataArcarde: any){

      this.waitingResponse = true;
      this.creationDone = false;

      this.api.post(EndpointSousCompetion.CREATED_NEW_S_C+dataArcarde.idArcarde, competionData, this.authorization).subscribe((resp)=>{
          this.arcardeService.loadArcade();
          this.loadListUnderCompetition();
          this.toastr.success('Competition Created', 'Success', { timeOut: 7000 });
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
        },(error: any)=> {
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

  addCriteria(gameId: string, gameWinnerCriteriasId: string): Promise<boolean>{
    return new Promise<boolean>((resolve,reject) => {
      
      this.waitingCriteriasAdd = true;
      const requestBody = { gameID: gameId, gammeWinnersID: gameWinnerCriteriasId }
      console.log('request', requestBody);
      this.api.put(EndpointSousCompetion.ADD_CRITERIAS_GAME, requestBody, this.authorization).subscribe((resp)=>{
          this.waitingCriteriasAdd = false;
          
          this.toastr.success('Criteria Add', 'SUCCESS', {timeOut: 7100});
          resolve(true);
      
    },(error: any)=>{

      this.waitingCriteriasAdd = false;
      if (error.status == 500) {
        this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
      } else if (error.status == 401) {
        this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
      } else if (error.status == 404 && error.message == 'Game competition not found' ) {
        this.toastr.error("Game Competition not found", 'error', { timeOut: 10000 });
      }else if (error.status == 404 && error.message == 'Game criteria already exist' ) {
        this.toastr.error("Game criteria already exist", 'error', { timeOut: 10000 });
      }else if (error.status == 404 && error.message == 'Game criteria not found' ) {
        this.toastr.error("Game criteria not found", 'error', { timeOut: 10000 });
      }
      else {
        this.toastr.error("Une erreur est survenue lors de l'ajout de ce critère", 'Error', { timeOut: 7000 });
      }
      resolve(false);
    })
    });

 
  }

  removeWinningCriteria(gameId: string , gameWinnerCriteriasId: string){

    return new  Promise<boolean>((resolve, reject) => {

      this.waitingCreteriaDeletingDone = true;
      const url = EndpointSousCompetion.REMOVE_GAME_CRITERIAS +`/${gameId}/${gameWinnerCriteriasId}`
  
      console.log("GCI : " + gameWinnerCriteriasId)
  
      this.api.deleteListWinnerCriterias( url , this.authorization).subscribe(()=>{
  
          this.waitingCreteriaDeletingDone = false;
          this.toastr.success('Delete Done', 'SUCCESS', { timeOut: 7000 });
          resolve(true);

      }, (error: any)=>{
  
        this.waitingCreteriaDeletingDone = false;
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        } else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
        resolve(false)
      })
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

  getListParticipants(idCompetition: string): Promise<User[]>{
    this.waitingParticipantsResp = true;
    return new Promise((resolve, reject) => {

      this.api.get(EndpointSousCompetion.PARTICIPANTS_LIST+idCompetition, this.authorization).subscribe((resp) => {
        this.waitingParticipantsResp = false;
        resolve(resp.data);
      }, (error)=> {
        this.waitingParticipantsResp = false;
        reject([]);
        if (error.status == 500) {
          this.toastr.error("Indisponible , veuillez reessayer ultérieurement.", 'Serveur en reparation', { timeOut: 10000 });
        } else if (error.status == 503) {
          this.toastr.error("Le serveur est temporairement indisponible", 'Serveur en reparation', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Veuillez vous reconnecter", 'Session expirée', { timeOut: 10000 });
        } else if (error.status == 404) {
          console.log("Aucun participants pour cette competition");
        }
        else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
      })

    })
  }


  getParentCompetitionID(idCompetition: string): string {
    let parentID;
    parentID = this.underCompetiton.parentCompetition._id;
    return parentID;
  }
}
