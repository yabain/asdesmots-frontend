import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SousCompetitionService } from '../services/sous-competition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-competition',
  templateUrl: './update-competition.component.html',
  styleUrls: ['./update-competition.component.css']
})
export class UpdateCompetitionComponent implements OnInit {
  
  loading: boolean = false;
  submitted: boolean = false;
  fetching: boolean = false;
  updateForm: FormGroup;
  arcadeId: string;
  competitionId: string = '';
  competitions: any[] = [];
  gameLevels: any[] = [];
  competitionData: any;

  
  constructor(
    public sousCompetitionService: SousCompetitionService,    
    private toastr: ToastrService,
    private router: Router,
    private levelService: LevelService,
    private fb: FormBuilder,
    private activedRouter: ActivatedRoute) {
      this.competitionId = this.activedRouter.snapshot.params['id'];
      this.sousCompetitionService.getCompetitionById(this.competitionId).then((resp: any) => {
        this.competitionData = resp.data;
        this.arcadeId = this.competitionData.arcadeId;
        this.initForm();
      }, (error: any) => { })
  }

  ngOnInit(): void {
    this.getLevelList();
    this.getCompetitions();
  }

  initForm() {
    this.updateForm = this.fb.group({
      name: [
        this.competitionData.name,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(60),
        ],
      ],
      description: [
        this.competitionData.description,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(65),
        ],
      ],
      gameLevel: [this.competitionData.gameLevel, Validators.required],
      isSinglePart: [this.competitionData.isSinglePart],
      canRegisterPlayer: [this.competitionData.canRegisterPlayer],
      localisation: [this.competitionData.localisation, Validators.required],
      maxPlayerLife: [this.competitionData.maxPlayerLife, Validators.required],
      maxTimeToPlay: [this.competitionData.maxTimeToPlay, Validators.required],
      startDate: [this.competitionData.startDate, Validators.required],
      endDate: [this.competitionData.endDate, Validators.required],
      maxOfWinners: [this.competitionData.maxOfWinners, Validators.required],
      lang: [this.competitionData.lang, Validators.required],
      parentCompetition: [this.competitionData.parentCompetitionId],
    });
  }
  getCompetitions() {
    this.loading = true;
    this.sousCompetitionService
      .getAllCompettions(this.arcadeId)
      .then((response: any) => {
        this.competitions = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
      });
  }

  getLevelList() {
    if (JSON.parse(sessionStorage.getItem('levels-list'))) {
      const data = JSON.parse(sessionStorage.getItem('levels-list'));
      this.gameLevels = data.levels;
    }
    else {
      this.levelService.getAllLevels().then(response => {
        this.gameLevels = response.levels;
      }, (err: any) => {
        console.log(err);
      });
    }
  }

  update() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }

    if (
      this.updateForm.get('startDate')?.value <
      this.updateForm.get('endRegistrationDate')?.value
    )
      this.updateForm.controls['startDate'].setErrors({
        laterThanEndRegistrationDate: true,
      });
    if (
      this.updateForm.get('endDate')?.value <
      this.updateForm.get('startDate')?.value
    )
      this.updateForm.controls['endDate'].setErrors({
        laterThanStartDate: true,
      });

    if (this.updateForm.invalid) {
      return;
    }
    this.fetching = true;
    this.sousCompetitionService
      .update(this.updateForm.value, this.competitionId)
      .then(() => {
        this.submitted = false;
        this.fetching = false;
        this.updateForm.reset();
        this.router.navigate([`/arcarde/details/${this.arcadeId}`]);
      })
      .catch((error) => {
        if (error.includes('Competition already exists') || error.errors?.alreadyUsed)
          this.updateForm.controls['name'].setErrors({ used: true });
        this.submitted = false;
        this.fetching = false;
      });
  }
  
  toggleCheckbox(control: string) {
    this.updateForm.get(control)?.setValue(!this.updateForm.get(control)?.value);
  }

  onDateTimeChange(newValue: string, control) {
    this.updateForm.get(control).setValue(newValue);
  }
}


