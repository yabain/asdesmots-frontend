import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { EndpointSousCompetion } from './Endpoint';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SousCompetitionService {
  waitingResponse: boolean = false;
  creationDone: boolean = false;
  listUnderCompetition: SousCompetion[] = [];
  newUnderCompetionParam : SousCompetion = new SousCompetion();
  listCompetionLocation: string[] = [];

  form : FormGroup;//created
  formUpdate: FormGroup;

  authorization : any;

  constructor(private api: ApiService,
               private toastr: ToastrService,
               private fb: FormBuilder 
               ) { this.authorization = {  'Authorization': 'Bearer ' + this.api.getAccessToken() } }

  get f(){
      return this.form.controls;
  }

  get formUpdt(){
      return this.formUpdate.controls;
  }

  initFormUpdate(dataToUpdate: SousCompetion){
    this.form = this.fb.group({
        name : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])],
        description : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(65)])],
        level : ['', Validators.required],
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

    this.initUpdatingValues(dataToUpdate);

    this.form.valueChanges.subscribe((data: any)=>{
        Object.assign(this.newUnderCompetionParam, data);
    });
  }

  initUpdatingValues(data: SousCompetion){
      this.formUpdate.controls['name'].setValue(data.name);
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
  }

  initFormControl(){
    //control creation new under competition
    this.form = this.fb.group({
        name : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])],
        description : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(65)])],
        level : ['', Validators.required],
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
  createCompetition(competionData: SousCompetion, id_arcarde: string){
      competionData.gameParts = [];
      console.log('compet', competionData)
      console.log('compet ID', id_arcarde)
      this.waitingResponse = true;
      this.creationDone = false;

      this.api.post(EndpointSousCompetion.CREATED_NEW_S_C+id_arcarde, competionData, this.authorization).subscribe((resp)=>{
          console.log('created respo', resp);
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

 
  update(competionData: SousCompetion){
      this.api.put(EndpointSousCompetion.UPDATE_S_C+competionData.id, competionData, this.authorization).subscribe((resp)=>{
          console.log('update response', resp);
      },(error: any) => {
          
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        } else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
      });
  }

  loadAllCompetition(){
      //this.waitingResponse = true;
  }
}
