import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { Endpoint } from './endpoint.enum';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/entities/user';

@Injectable({
  providedIn: 'root'
})
export class ArcardeService {
  listArcardeUser: Arcarde[] = [];
  listAllArcarde: Arcarde[] = [];

  listUser : User[] = [];
  authorization : any;
  waitingResponse: boolean = false;
  unsuscriptionDone : boolean = false;


  formControl!: FormGroup;
  souscriptionParam : any;

  constructor(private api: ApiService, 
              private toastr: ToastrService,
              private fb: FormBuilder 

    ) { this.authorization = {  'Authorization': 'Bearer ' + this.api.getAccessToken() }}

  get f(){
    return this.formControl.controls;
  }

  initFormControl(){
      this.formControl = this.fb.group({
          gameID: ['', Validators.required],
          playerID: ['', Validators.required],
          //localisation: ['', Validators.required]
      });

      //start listener on change form change values and init. param
      this.formControl.valueChanges.subscribe((data)=>{
        console.log('data', data);
          this.souscriptionParam = {
              gameID: data.gameID,
              playerID: data.playerID
             // localisation: data.localisation
          }
      });
  }

  loadArcade(){
    this.listArcardeUser = [];
    this.waitingResponse = true;
    this.api.get(Endpoint.LOAD_ARCARDE_LIST,  this.authorization).subscribe((resp: any)=>{
            this.waitingResponse = false;
            this.listArcardeUser = Array.from(resp.data);
          
      },(error: any) => {
        this.waitingResponse = false;
          
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        } else if (error.status == 404) {
          this.toastr.error("Game Arcarde not found", 'Error', { timeOut: 10000 });
        } else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
      });
  }

  loadAllArcarde(){
    //call the endpoint to get list of arcades
    this.listAllArcarde = [];
    
  }

  getArcardeById(id: string){
      this.api.get(Endpoint.GET_ACARDE_BY_ID+id, this.authorization).subscribe((resp)=>{
          console.log(resp);
      }, (error: any) => {
          
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        } else if (error.status == 404) {
          this.toastr.error("Game Arcarde not found", 'Error', { timeOut: 10000 });
        } else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
      });
  }

  addUserToAccarde(){
        this.api.post(Endpoint.ADD_USER_TO_ARCARDE, this.souscriptionParam, this.authorization).subscribe((resp)=>{
            console.log('response', resp);
            this.toastr.success('Suscription Done and Save', 'Success', {timeOut: 10000});

        }, (error: any) => {
          
          if (error.status == 500) {
            this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
          } else if (error.status == 401) {
            this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
          } else if (error.status == 404) {
            this.toastr.error("Game Arcarde not found", 'Error', { timeOut: 10000 });
          } else {
            this.toastr.error(error.message, 'Error', { timeOut: 7000 });
          }
        });
  }

  UnsuscribeUserToAcarde(requestBody: {userID: string, gameID: string, localisation: string }){
      this.api.delete(Endpoint.ADD_USER_TO_ARCARDE, requestBody).subscribe((resp)=>{
            this.toastr.success('Unsuscription Done', 'Success', { timeOut: 10000 });
            this.unsuscriptionDone = true;
            console.log('response', resp);
        }, (error: any) => {
          
          if (error.status == 500) {
            this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
          } else if (error.status == 401) {
            this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
          } else if (error.status == 404) {
            this.toastr.error("Game Arcarde not found", 'Error', { timeOut: 10000 });
          } else {
            this.toastr.error(error.message, 'Error', { timeOut: 7000 });
          }
        });
  }
}

