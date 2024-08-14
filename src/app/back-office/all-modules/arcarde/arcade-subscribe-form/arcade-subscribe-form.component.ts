import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArcardeService } from '../services/arcarde.service';

@Component({
  selector: 'app-arcade-subscribe-form',
  templateUrl: './arcade-subscribe-form.component.html',
  styleUrls: ['./arcade-subscribe-form.component.css']
})
export class ArcadeSubscribeFormComponent implements OnInit {

  @Input() competitionId : string;

  subscribeForm: FormGroup;
  locations: any[] = [];
  waitingResponse:  boolean = false;
  submitted:  boolean = false;

  constructor(
    private fb: FormBuilder,
    private arcadeService: ArcardeService
  ) { }

  ngOnInit(): void {
    this.subscribeForm = this.fb.group({
      gameID: ['', Validators.required],
      // playerID: ['', Validators.required],
      location: ['', Validators.required],
    })
    this.listLocations(this.competitionId);
  }

  listLocations(competitionId) {
    this.arcadeService.listCompetitionLocalisations(competitionId)
    .then((resp: any) => {
      console.log(resp)
      this.locations = resp.data;
    })
    .catch((error) => {
      console.error(error);
    }); 
  }
  
  subscribe() {
    this.waitingResponse = true;
    this.submitted = true;
    this.arcadeService.addUserToAccarde();
  }

}
