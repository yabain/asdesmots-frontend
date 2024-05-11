import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { Endpoint } from './endpoint.enum';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/entities/user';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { State } from 'src/app/shared/entities/state.enum';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ArcardeService {
  listArcardeUser: Arcarde[] = [];
  listAllArcarde: Arcarde[] = [];
  listLocationArcarde: string[] = [];
  listUnderCompetion: SousCompetion[]=[];
  listParticipant: any[];
  listUserData: any[] = [];

  competitionParent: any[] = [];

  listUser : User[] = [];
  authorization : any;
  waitingResponse: boolean = false;
  unsuscriptionDone : boolean = false;
  suscriptionDone : boolean = false;

  formControlSuscription!: FormGroup;
  souscriptionParam: any;

  formControlCreateArcarde!: FormGroup;
  newArcarde: Arcarde = new Arcarde();
  isCreationDone: boolean = false;

  dateNow:Date = new Date();

  deleteDone : boolean = false;
  waitingResponseSuscrib : boolean = false;
  // listPlayer: []any;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private location:Location,
              private languageService: TranslationService
    ) { this.authorization = {  'Authorization': 'Bearer ' + this.api.getAccessToken() }}

  get f(){
    return this.formControlSuscription.controls;
  }

  get f_Creation(){
    return this.formControlCreateArcarde.controls;
  }

  initFormControl(){
      this.formControlSuscription = this.fb.group({
          gameID: ['', Validators.required],
          playerID: ['', Validators.required],
          location: ['', Validators.required]
      });

      //start listener on change form change values and init. param
      this.formControlSuscription.valueChanges.subscribe((data)=>{
        console.log('data', data);
          this.souscriptionParam = {
              gameID: data.gameID,
              playerID: data.playerID,
              localisation: data.location
          }
      });

      this.formControlSuscription.controls['gameID'].valueChanges.subscribe((idGame:any)=>{
          if(idGame){
               this.loadLocalisationOfCompetition(idGame);
            }
      });

  }

  initFormCreationArcarde(){
      this.formControlCreateArcarde = this.fb.group({
         name: ['', Validators.required],
         description: ['', Validators.required],
         isOnlineGame: ['', Validators.required],
         canRegisterPlayer: ['', Validators.required],
         isFreeRegistrationPlayer: ['', Validators.required],
         maxPlayersNumber: ['', Validators.required],
         startDate: ['', Validators.required],
         endDate: ['', Validators.required],
         startRegistrationDate: ['', Validators.required],
         endRegistrationDate: ['', Validators.required]
      });
      this.initDefaultBooeleanValues();
      this.formControlCreateArcarde.valueChanges.subscribe((data: any)=>{
          Object.assign(this.newArcarde, data);
      });

  }

  initDefaultBooeleanValues(){
      this.f_Creation['canRegisterPlayer'].setValue(true);
      this.f_Creation['isFreeRegistrationPlayer'].setValue(false);
      this.f_Creation['isOnlineGame'].setValue(true);

  }
  loadArcade(){
    //get the list arcarde of the current user
    this.listArcardeUser = [];
    this.waitingResponse = true;
    this.listUnderCompetion = [];
    this.api.get(Endpoint.LOAD_ARCARDE_LIST,  this.authorization).subscribe((resp: any)=>{
            this.waitingResponse = false;
            this.listArcardeUser = Array.from(resp.data);
            this.buildListUnderCompetion(this.listArcardeUser);
            this.buildListLocation(this.listArcardeUser);
      },(error: any) => {
        this.waitingResponse = false;

        if (error.status == 500) {
          this.toastr.error(this.languageService.transformMessageLanguage("internalError"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error(this.languageService.transformMessageLanguage("refreshPage"), this.languageService.transformMessageLanguage('offSession'), { timeOut: 10000 });
        } else if (error.status == 404) {
          this.toastr.error(this.languageService.transformMessageLanguage("arcardenotFound"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
        } else {
          this.toastr.error(this.languageService.transformMessageLanguage("noInternet"), this.languageService.transformMessageLanguage('error'), { timeOut: 7000 });
        }
      });
  }
  getUserDataById(userId: string): any {
    const userDataString = localStorage.getItem('users-list');
    if (userDataString) {
      const usersDatas = JSON.parse(userDataString);
      console.log("usersDatas: ", usersDatas);
      if (usersDatas._id === userId) {
        console.log("user founded")
        return usersDatas;
      }
    }
    return null;
  }

  getUserById(userId: string): User | null {
    // Récupérer la liste des utilisateurs depuis le localStorage
    const userListString = localStorage.getItem('users-list');

    if (userListString) {
      // Convertir la chaîne de caractères en tableau d'objets
      const userList: User[] = JSON.parse(userListString);
      // Parcourir la liste des utilisateurs
      for (const user of userList) {
        // Comparer l'identifiant avec celui en paramètre
        if (user._id === userId) {
          // L'identifiant correspond, renvoyer l'utilisateur
          return user;
        }
      }
    }

    // Aucune correspondance d'identifiant trouvée, renvoyer null
    return null;
  }



  getListUsersOfArcardes(id: string){
    this.waitingResponse = true;

    this.api.get(Endpoint.GET_USERS_ARCARDE+id+'/subscription', this.authorization).subscribe((resp)=>{
      if ( resp && resp.data && resp.data.length > 0) {
        console.log("réponse serveur: ", resp.data.length);
        console.log("ronice1");
        this.listUserData = Array.from(resp.data);
        console.log("Participants arcarde: ", this.listUserData);
        this.listUserData.forEach(element =>{
          console.log("test");
          const userData = this.getUserById(element.player);
          console.log("datauser: ", userData);
          if (userData) {
            console.log("taille tableau avant ajout: ", this.listUser.length);
            console.log("ronice2");
            this.listUser.push(userData);
            console.log("taille tableau aprés ajout: ", this.listUser.length);
          }
        });
        console.log("List of user: ", this.listUser);
      } else {
        console.log("ronice3");
        this.listUser = [];
        this.toastr.error(this.languageService.transformMessageLanguage("Pas de particaipant à cette arcarde."), 'Error', { timeOut: 10000 });
      }
      this.waitingResponse = false;
},(error)=>{
  if (error.status == 500) {
    this.toastr.error(this.languageService.transformMessageLanguage("Internal Server Error. Try again later please."), 'Error', { timeOut: 10000 });
  } else if (error.status == 401) {
    this.toastr.error(this.languageService.transformMessageLanguage("Veillez vous reconnecter"), 'Session expirée', { timeOut: 10000 });
  }else{
    this.toastr.error(this.languageService.transformMessageLanguage("No internet connection"), 'Error', { timeOut: 7000 });
  }
   this.waitingResponse = false;
});

this.listUser = [];

}

  loadAllArcarde(){
    //call the endpoint to get list of arcades
    this.listAllArcarde = [];
    this.waitingResponse = true;
    this.api.get(Endpoint.GET_LIST_ARCARDE+-1+'/'+-1, this.authorization).subscribe((response)=>{
        this.listAllArcarde = Array.from(response.data);
        this.buildListUnderCompetion(this.listAllArcarde);
        this.waitingResponse = false;

       // this.buildListLocation(this.listAllArcarde);

    },(error: any) => {
      this.waitingResponse = false;

      if (error.status == 500) {
        this.toastr.error(this.languageService.transformMessageLanguage("internalError"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
      } else if (error.status == 401) {
        this.toastr.error(this.languageService.transformMessageLanguage("refreshPage"), this.languageService.transformMessageLanguage('offSession'), { timeOut: 10000 });
      } else if (error.status == 404) {
        this.toastr.error(this.languageService.transformMessageLanguage("arcardenotFound"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
      } else {
        this.toastr.error(this.languageService.transformMessageLanguage("noInternet"), this.languageService.transformMessageLanguage('error'), { timeOut: 7000 });
      }
    });
  }

  loadLocalisationOfCompetition(idArcarde: string) {
    this.listLocationArcarde = [];
    this.api.get(`game-arcarde/${idArcarde}/localisation`).subscribe(
      (response)=>{
        this.listLocationArcarde = Array.from(response.data);
    },(error: any) => {
      this.waitingResponse = false;

      if (error.status == 500) {
        this.toastr.error(this.languageService.transformMessageLanguage("internalError"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
      } else if (error.status == 401) {
        this.toastr.error(this.languageService.transformMessageLanguage("refreshPage"), this.languageService.transformMessageLanguage('offSession'), { timeOut: 10000 });
      } else if (error.status == 404) {
        this.toastr.error(this.languageService.transformMessageLanguage("arcardenotFound"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
      } else {
        this.toastr.error(this.languageService.transformMessageLanguage("noInternet"), this.languageService.transformMessageLanguage('error'), { timeOut: 7000 });
      }
    });
  }

  createNewArcarde(){
      this.waitingResponse = true;
      this.isCreationDone = false;
      this.api.post(Endpoint.CREATE_ARCARDE, this.newArcarde, this.authorization).subscribe((response)=>{
          console.log('creation Response', response);
          this.waitingResponse = false;
          this.isCreationDone = true;
          this.toastr.success('Arcarde Created', this.languageService.transformMessageLanguage("succes"), { timeOut: 10000 });
      }, (error: any)=>{
        if (error.status == 500) {
          this.toastr.error(this.languageService.transformMessageLanguage("internalError"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error(this.languageService.transformMessageLanguage("refreshPage"), this.languageService.transformMessageLanguage('offSession'), { timeOut: 10000 });
        } else if (error.status == 404) {
          this.toastr.error(this.languageService.transformMessageLanguage("arcardenotFound"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
        } else {
          this.toastr.error(this.languageService.transformMessageLanguage("noInternet"), this.languageService.transformMessageLanguage('error'), { timeOut: 7000 });
        }
        this.waitingResponse = false;
      });
  }

    changeState(data: {gameArcardeID: string, state: any}){
        this.waitingResponse = false;

        console.log('game arcarde id :', data.gameArcardeID);
        this.api.put(Endpoint.CHANGE_STATE, data, this.authorization).subscribe((response: any)=>{
            this.toastr.success('Arcarde Started', 'Success', {timeOut: 10000});
            this.clientChangeState(data.gameArcardeID, State.WAITING_PLAYER);

            this.waitingResponse = false;

        }, (error: any)=>{
          console.log('error ', error);
          if (error.error.statusCode == 500) {
            this.toastr.error(this.languageService.transformMessageLanguage("internalError"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
          } else if (error.error.statusCode == 401) {
            this.toastr.error(this.languageService.transformMessageLanguage("refreshPage"), this.languageService.transformMessageLanguage('offSession'), { timeOut: 10000 });
          } else if(error.error.statusCode == 403) {
            this.toastr.error(this.languageService.transformMessageLanguage(error.error.message), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
          } else if (error.error.statusCode == 404) {
            this.toastr.error(this.languageService.transformMessageLanguage("arcardenotFound"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
          } else {
            this.toastr.error(this.languageService.transformMessageLanguage("noInternet"), this.languageService.transformMessageLanguage('error'), { timeOut: 7000 });
          }
          this.waitingResponse = false;
        });

    }

   async clientChangeState(idArcarde: string, statut: string){
    //change the arcarde's state on user client (ui)

          const index = this.listArcardeUser.findIndex(arcarde => arcarde._id === idArcarde);
          if(index != -1){
            this.listArcardeUser[index].gameState = statut;
          }
    }

  deleteArcarde(id: string){
      console.log('id arcarde to delete', id);
     /* this.waitingResponse = true;
      this.deleteDone = false;
      this.api.delete(Endpoint.DELETE_ARCARDE+id, this.authorization).subscribe((resp)=>{
            this.waitingResponse = false;
            this.deleteDone = true;
            this.toastr.success('Delete Done', 'SUCCESS', { timeOut: 7000});
      }, (error)=>{
        if (error.status == 500) {
          this.toastr.error(this.languageService.transformMessageLanguage("internalError"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error(this.languageService.transformMessageLanguage("refreshPage"), this.languageService.transformMessageLanguage('offSession'), { timeOut: 10000 });
        } else {
          this.toastr.error(this.languageService.transformMessageLanguage("noInternet"), this.languageService.transformMessageLanguage('error'), { timeOut: 7000 });
        }
        this.waitingResponse = false;
      });*/
  }

  getArcardeById(id: string){
      this.api.get(Endpoint.GET_ACARDE_BY_ID+id, this.authorization).subscribe((resp)=>{
          console.log(resp);
      }, (error: any) => {

        if (error.status == 500) {
          this.toastr.error(this.languageService.transformMessageLanguage("internalError"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error(this.languageService.transformMessageLanguage("refreshPage"), this.languageService.transformMessageLanguage('offSession'), { timeOut: 10000 });
        } else if (error.status == 404) {
          this.toastr.error(this.languageService.transformMessageLanguage("arcardenotFound"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
        } else {
          this.toastr.error(this.languageService.transformMessageLanguage("noInternet"), this.languageService.transformMessageLanguage('error'), { timeOut: 7000 });
        }
      });
  }

  addUserToAccarde(){
       this.waitingResponseSuscrib = true;
       this.suscriptionDone = false;
        this.api.post(Endpoint.ADD_USER_TO_ARCARDE, this.souscriptionParam, this.authorization).subscribe((resp)=>{

            this.toastr.success(this.languageService.transformMessageLanguage('Suscription Done and Save'), 'Success', {timeOut: 10000});
            this.waitingResponseSuscrib = false;
            this.suscriptionDone = true;
        }, (error: any) => {

          if (error.error.status == 500) {
            this.toastr.error(this.languageService.transformMessageLanguage("internalError"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
          } else if (error.error.status == 401) {
            this.toastr.error(this.languageService.transformMessageLanguage("refreshPage"), this.languageService.transformMessageLanguage('offSession'), { timeOut: 10000 });
          } else if (error.error.status == 404) {
            this.toastr.error(this.languageService.transformMessageLanguage("arcardenotFound"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
          } else {
            this.toastr.error(this.languageService.transformMessageLanguage("noInternet"), this.languageService.transformMessageLanguage('error'), { timeOut: 7000 });
          }
          this.waitingResponseSuscrib = false;
          this.suscriptionDone = false;
        });
  }

  UnsuscribeUserToAcarde(requestBody: { gameID: string, playerID: string,}) {
      this.waitingResponse = true;

      this.api.post(Endpoint.DELETE_USER_TO_ARCARDE, requestBody).subscribe((resp)=>{
            this.toastr.success(this.languageService.transformMessageLanguage('Unsuscription Done'), this.languageService.transformMessageLanguage("succes"), { timeOut: 10000 });
            this.unsuscriptionDone = true;
            this.waitingResponse = false;
            console.log('response', resp);
        }, (error: any) => {

          if (error.error.status == 500) {
            this.toastr.error(this.languageService.transformMessageLanguage("internalError"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
          } else if (error.error.status == 401) {
            this.toastr.error(this.languageService.transformMessageLanguage("refreshPage"), this.languageService.transformMessageLanguage('offSession'), { timeOut: 10000 });
          } else if (error.error.status == 404) {
            this.toastr.error(this.languageService.transformMessageLanguage("arcardenotFound"), this.languageService.transformMessageLanguage('error'), { timeOut: 10000 });
          } else {
            this.toastr.error(this.languageService.transformMessageLanguage("noInternet"), this.languageService.transformMessageLanguage('error'), { timeOut: 7000 });
          }
          this.waitingResponse = false;
        });
  }

 async buildListUnderCompetion(listArcarde: Arcarde[]){
    this.listUnderCompetion = [];
     listArcarde.forEach((arcarde)=>{
            this.listUnderCompetion = Array.from(this.listUnderCompetion.concat(arcarde.competitionGames));
      });

  }

  getCompetitonArcardeID(idCompet: string){
      let parentArcardeId: string = '';

      this.listArcardeUser.forEach((arcarde)=>{
          arcarde.competitionGames.forEach((compet)=>{
              if(compet._id === idCompet){
                  parentArcardeId = arcarde._id;
              }
          });
      });
      return parentArcardeId;
  }

  async buildListLocation(listArcarde: Arcarde[]){
    this.listLocationArcarde = [];
     let i_arcarde = 0;
    if(listArcarde.length > 0){
        listArcarde.forEach((arcade)=>{
          if(arcade.competitionGames.length > 0){
              arcade.competitionGames.forEach((compet)=>{
              if(compet.localisation.toString() !== '' || compet.localisation.toString().length != 0){
                this.listLocationArcarde[i_arcarde] = compet.localisation;
              }
              i_arcarde++;
            });
          }
      });
    }

  }

  verificationAndCreateNewArcarde() {
    const newStartDate = new Date(this.newArcarde.startDate);
    if (newStartDate < this.dateNow) {
      return this.toastr.error(
        this.languageService.transformMessageLanguage(
          'Start date must be greater than or equal to today'
        ),
        'Error',
        { timeOut: 5000 }
      );
    } else if (this.newArcarde.endDate < this.newArcarde.startDate) {
      return this.toastr.error(
        this.languageService.transformMessageLanguage(
          'the end date must be greater than the start date'
        ),
        'Error',
        { timeOut: 5000 }
      );
    } else if (
      this.newArcarde.startRegistrationDate > this.newArcarde.startDate
    ) {
      return this.toastr.error(
        this.languageService.transformMessageLanguage(
          'The recording start date must be less than or equal to the start date'
        ),
        'Error',
        { timeOut: 5000 }
      );
    } else if (
      this.newArcarde.startRegistrationDate > this.newArcarde.endDate
    ) {
      return this.toastr.error(
        this.languageService.transformMessageLanguage(
          'The recording start date must be less than the end date'
        ),
        'Error',
        { timeOut: 5000 }
      );
    } else if (
      this.newArcarde.endRegistrationDate <
      this.newArcarde.startRegistrationDate
    ) {
      return this.toastr.error(
        this.languageService.transformMessageLanguage(
          'The recording end date must be greater than the recording end date'
        ),
        'Error',
        { timeOut: 5000 }
      );
    } else if (this.newArcarde.endRegistrationDate > this.newArcarde.endDate) {
      return this.toastr.error(
        this.languageService.transformMessageLanguage(
          'The recording end date must be less than the end date'
        ),
        'Error',
        { timeOut: 5000 }
      );
    } else if (this.newArcarde.maxPlayersNumber < 2) {
      return this.toastr.error(
        this.languageService.transformMessageLanguage(
          'There should be at least 2 players'
        ),
        'Error',
        { timeOut: 5000 }
      );
    } else {
      this.createNewArcarde();
      this.location.back();
    }
  }

}

