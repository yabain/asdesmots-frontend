import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArcardeService } from '../../services/arcarde.service';
import { SousCompetitionService } from '../../competition/services/sous-competition.service';

@Component({
  selector: 'app-arcade-subscribe-form',
  templateUrl: './arcade-subscribe-form.component.html',
  styleUrls: ['./arcade-subscribe-form.component.css']
})
export class ArcadeSubscribeFormComponent implements OnInit {

  @Input() arcadeId : string;
  @Output() subscribedFeedback = new EventEmitter<boolean>();

  subscribeForm: FormGroup;
  locations: any[] = [];
  waitingResponse:  boolean = false;
  submitted:  boolean = false;

  constructor(
    private fb: FormBuilder,
    private subCompetitionService: SousCompetitionService
  ) { }

  ngOnInit(): void {
    this.subscribeForm = this.fb.group({
      location: ['', Validators.required],
    })
    console.log(this.arcadeId);
    this.listLocations();
  }

  listLocations() {
    this.subCompetitionService.listCompetitionLocalisations(this.arcadeId)
    .then((resp: any) => {
      this.locations = resp.data;
    })
    .catch((error) => {
      console.error(error);
    }); 
  }
  
  subscribe() {
    this.submitted = true;
    if (this.subscribeForm.invalid) {
      return;
    }
    this.waitingResponse = true;
    this.subCompetitionService
      .subscribePlayer(this.subscribeForm.value)
      .then(() => {
        this.submitted = false;
        this.waitingResponse = false;
        this.subscribeForm.reset();
        this.subscribedFeedback.emit(true);
        $(`#cancel-btn00-${this.arcadeId}`).click();
      })
      .catch((error) => {
        if (error.includes('Competition already exists') || error.errors?.alreadyUsed)
          this.subscribeForm.controls['name'].setErrors({ used: true });
        this.submitted = false;
        this.waitingResponse = false;
      });
    // this.arcadeService.addUserToAccarde();
  }

}
