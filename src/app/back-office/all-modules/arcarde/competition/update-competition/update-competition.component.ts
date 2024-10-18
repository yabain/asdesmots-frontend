import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SousCompetitionService } from '../services/sous-competition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { ToastrService } from 'ngx-toastr';
import { ArcardeService } from '../../services/arcarde.service';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';

@Component({
  selector: 'app-update-competition',
  templateUrl: './update-competition.component.html',
  styleUrls: ['./update-competition.component.css'],
})
export class UpdateCompetitionComponent implements OnInit {
  loading: boolean = true;
  submitted: boolean = false;
  fetching: boolean = false;
  updateForm: FormGroup;
  competitionId: string = '';
  arcadeData: Arcarde;
  competitions: any[] = [];
  gameLevels: any[] = [];
  competitionData: any;

  constructor(
    public sousCompetitionService: SousCompetitionService,
    private levelService: LevelService,
    private fb: FormBuilder,
    public arcardeSrv: ArcardeService,
    private activedRouter: ActivatedRoute
  ) {
    this.competitionId = this.activedRouter.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loading = true;
    this.sousCompetitionService.getCompetitionById(this.competitionId).then(
      (resp: any) => {
        this.competitionData = resp.data;
        this.arcardeSrv.getArcardeById(this.competitionData.arcadeId).then((resp: any) => {
          this.arcadeData = resp.data;
        });
        this.initForm();
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      }
    );
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
      gameLevel: [this.competitionData.gameLevel?._id, Validators.required],
      isSinglePart: [this.competitionData.isSinglePart],
      canRegisterPlayer: [this.competitionData.canRegisterPlayer],
      localisation: [this.competitionData.localisation, Validators.required],
      maxPlayerLife: [this.competitionData.maxPlayerLife, Validators.required],
      maxTimeToPlay: [this.competitionData.maxTimeToPlay, Validators.required],
      startDate: [this.competitionData.startDate, Validators.required],
      endDate: [this.competitionData.endDate, Validators.required],
      maxOfWinners: [this.competitionData.maxOfWinners, Validators.required],
      lang: [this.competitionData.lang, Validators.required],
      parentCompetition: [this.competitionData.parentCompetition],
    });
  }
  getCompetitions() {
    this.sousCompetitionService
      .getArcadeCompetitionsByChildCompetition(this.competitionId)
      .then((response: any) => {
        this.competitions = response.data?.filter(competition => {
          return competition._id !== this.competitionId
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getLevelList() {
    if (JSON.parse(sessionStorage.getItem('levels-list'))) {
      const data = JSON.parse(sessionStorage.getItem('levels-list'));
      this.gameLevels = data.levels;
    } else {
      this.levelService.getAllLevels().then(
        (response) => {
          this.gameLevels = response.levels;
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  update() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }

    const now = new Date();
    const endRegistrationDate = new Date(this.arcadeData.endRegistrationDate);
    let startDate: any = new Date(this.updateForm.get("startDate")?.value);
    let endDate: any = new Date(this.updateForm.get("endDate")?.value);

    const oneHourInMs = 60 * 60 * 1000;

    // Critère 1 : La date de début de la compétition doit être supérieure à la date de fin d'enregistrement d'au moins 1h
    if (startDate.getTime() < endRegistrationDate.getTime() + oneHourInMs) {
      this.updateForm.controls["startDate"].setErrors({
        atLeastOneHourAfterEndRegistration: true,
      });
    }

    // Critère 2 : La date de fin de la compétition doit être supérieure à la date de début d'au moins 1h
    if (endDate.getTime() < startDate.getTime() + oneHourInMs) {
      this.updateForm.controls["endDate"].setErrors({
        atLeastOneHourAfterStartDate: true,
      });
    }

    if (this.updateForm.invalid) {
      return;
    }
    this.fetching = true;
    this.sousCompetitionService
      .update(this.updateForm.value, this.competitionId)
      .then(() => {
        this.submitted = false;
        this.fetching = false;
      })
      .catch((error) => {
        if (
          error.includes('Competition already exists') ||
          error.errors?.alreadyUsed
        )
          this.updateForm.controls['name'].setErrors({ used: true });
        this.submitted = false;
        this.fetching = false;
      });
  }

  toggleCheckbox(control: string) {
    this.updateForm
      .get(control)
      ?.setValue(!this.updateForm.get(control)?.value);
  }

  onDateTimeChange(newValue: string, control) {
    this.updateForm.get(control).setValue(newValue);
  }
}
