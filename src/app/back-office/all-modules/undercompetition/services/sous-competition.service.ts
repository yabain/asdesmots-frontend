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
  listUnderCompetition: SousCompetion[] = [];
  newUnderCompetionParam : SousCompetion = new SousCompetion();

  form : FormGroup;

  constructor(private api: ApiService,
               private toastr: ToastrService,
               private fb: FormBuilder 
               ) { }

  get f(){
      return this.form.controls;
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

    this.form.valueChanges.subscribe((data: any)=>{
        Object.assign(this.newUnderCompetionParam, data);
        console.log(this.newUnderCompetionParam);
    });

  }
  createCompetition(competionData: SousCompetion, id_arcarde: string){
      this.api.post(EndpointSousCompetion.CREATED_NEW_S_C+id_arcarde, competionData).subscribe((resp)=>{
          console.log('created respo', resp);
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
      });
  }

  update(competionData: SousCompetion){
      this.api.put(EndpointSousCompetion.UPDATE_S_C+competionData.id, competionData).subscribe((resp)=>{
          console.log('update', resp);
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
