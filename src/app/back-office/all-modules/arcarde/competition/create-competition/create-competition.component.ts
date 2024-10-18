import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SousCompetion } from "src/app/shared/entities/scompetion.model";
import { LevelService } from "src/app/shared/services/level/level.service";
import { SousCompetitionService } from "../services/sous-competition.service";
import { ArcardeService } from "../../services/arcarde.service";
import { Arcarde } from "src/app/shared/entities/arcarde.model";

@Component({
  selector: "app-create-competition",
  templateUrl: "./create-competition.component.html",
  styleUrls: ["./create-competition.component.css"],
})
export class CreateCompetitionComponent implements OnInit {
  sousCompetitionSelctedData: SousCompetion = new SousCompetion();
  loading: boolean = false;
  submitted: boolean = false;
  fetching: boolean = false;
  createForm: FormGroup;
  arcadeId: string;
  arcadeData: Arcarde;
  competitions: any[] = [];
  gameLevels: any[] = [];
  parentCompetitionId: string = "";
  MinLength = 4;
  MaxLength = 64;

  constructor(
    public sousCompetitionService: SousCompetitionService,
    private fb: FormBuilder,
    private router: Router,
    public levelService: LevelService,
    public arcardeSrv: ArcardeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.arcadeId = this.activatedRoute.snapshot.paramMap.get("arcadeId");
    this.parentCompetitionId = this.activatedRoute.snapshot.paramMap.get(
      "parentCompetitionId"
    );
  }

  ngOnInit(): void {
    this.arcardeSrv.getArcardeById(this.arcadeId).then((resp: any) => {
      this.arcadeData = resp.data;
    });
    this.getLevelList();
    this.getCompetitions();
    this.createForm = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(65),
        ],
      ],
      description: ["", [Validators.required, Validators.minLength(4)]],
      gameLevel: ["", Validators.required],
      isSinglePart: [true],
      canRegisterPlayer: [false],
      localisation: ["", [Validators.required, Validators.maxLength(65)]],
      maxPlayerLife: ["", Validators.required],
      maxTimeToPlay: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      maxOfWinners: ["", Validators.required],
      lang: [, Validators.required],
      parentCompetition: [this.parentCompetitionId],
    });
  }

  getCompetitions() {
    this.loading = true;
    this.sousCompetitionService
      .getArcadeCompetitionsWithChildren(this.arcadeId)
      .then((response: any) => {
        this.competitions = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
      });
  }
  nameChanged() {
    delete this.createForm.controls["name"].errors?.["used"];
  }
  getLevelList() {
    if (JSON.parse(sessionStorage.getItem("levels-list"))) {
      const data = JSON.parse(sessionStorage.getItem("levels-list"));
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

  create() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }

    // const date = new Date();
    // const year = date.getFullYear();
    // const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0, donc ajoutez 1
    // const day = date.getDate().toString().padStart(2, '0');
    // const hours = date.getHours().toString().padStart(2, '0');
    // const minutes = date.getMinutes().toString().padStart(2, '0');
    // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    // if (this.createForm.get('startDate')?.value < formattedDate)
    //   this.createForm.controls['startDate'].setErrors({
    //     atLeastOneHourAfterNow: true,
    //   });
    // if (
    //   this.createForm.get('endDate')?.value <
    //   this.createForm.get('startDate')?.value
    // )
    //   this.createForm.controls['endDate'].setErrors({
    //     laterThanStartDate: true,
    //   });
    const now = new Date();
    const endRegistrationDate = new Date(this.arcadeData.endRegistrationDate);
    let startDate: any = new Date(this.createForm.get("startDate")?.value);
    let endDate: any = new Date(this.createForm.get("endDate")?.value);

    const oneHourInMs = 60 * 60 * 1000;

    // Critère 1 : La date de fin d'enregistrement doit être supérieure d'au moins un jour à la date actuelle
    if (startDate.getTime() < now.getTime() + oneHourInMs) {
      this.createForm.controls["startDate"].setErrors({
        atLeastOneHourAfterNow: true,
      });
    }

    // Critère 2 : La date de début de la compétition doit être supérieure à la date de fin d'enregistrement d'au moins 1h
    if (startDate.getTime() < endRegistrationDate.getTime() + oneHourInMs) {
      this.createForm.controls["startDate"].setErrors({
        atLeastOneHourAfterEndRegistration: true,
      });
    }

    // Critère 3 : La date de fin de la compétition doit être supérieure à la date de début d'au moins 1h
    if (endDate.getTime() < startDate.getTime() + oneHourInMs) {
      this.createForm.controls["endDate"].setErrors({
        atLeastOneHourAfterStartDate: true,
      });
    }

    if (this.createForm.invalid) {
      return;
    }
    startDate = new Date(this.createForm.get("startDate")?.value).toISOString();
    endDate = new Date(this.createForm.get("endDate")?.value).toISOString();
    const formData = {
      ...this.createForm.value,
      startDate,
      endDate,
    };
    this.fetching = true;
    this.sousCompetitionService
      .create(formData, this.arcadeId)
      .then(() => {
        this.submitted = false;
        this.fetching = false;
        this.createForm.reset();
        this.router.navigate([`/arcarde/details/${this.arcadeId}`]);
      })
      .catch((error) => {
        if (
          error.includes("Competition already exists") ||
          error.errors?.alreadyUsed
        )
          this.createForm.controls["name"].setErrors({ used: true });
        this.submitted = false;
        this.fetching = false;
      });
  }

  toggleCheckbox(control: string) {
    this.createForm
      .get(control)
      ?.setValue(!this.createForm.get(control)?.value);
  }

  onDateTimeChange(newValue: string, control) {
    this.createForm.get(control).setValue(newValue);
  }
}
