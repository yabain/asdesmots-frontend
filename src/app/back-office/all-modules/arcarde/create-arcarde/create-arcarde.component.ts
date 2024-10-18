import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Arcarde } from "src/app/shared/entities/arcarde.model";
import { TranslationService } from "src/app/shared/services/translation/language.service";
import { UserService } from "src/app/shared/services/user/user.service";
import { ArcardeService } from "../services/arcarde.service";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-create-arcarde",
  templateUrl: "./create-arcarde.component.html",
  styleUrls: ["./create-arcarde.component.css"],
})
export class CreateArcardeComponent implements OnInit {
  arcardeData: Arcarde = new Arcarde();
  createForm: FormGroup;
  waitingResponse: boolean = false;
  submitted: boolean = false;
  constructor(
    public arcadeServ: ArcardeService,
    private translate: TranslateService,
    public userServ: UserService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      isOnlineGame: [false, Validators.requiredTrue],
      canRegisterPlayer: [true],
      isFreeRegistrationPlayer: [false],
      maxPlayersNumber: [
        "",
        [Validators.min(2), Validators.max(100), Validators.required],
      ],
      startRegistrationDate: ["", Validators.required],
      endRegistrationDate: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
    });
  }

  nameChanged() {
    delete this.createForm.controls["name"].errors?.["used"];
  }
  createArcarde() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }

    const now = new Date();
    let startRegistrationDate: any = new Date(
      this.createForm.get("startRegistrationDate")?.value
    );
    let endRegistrationDate: any = new Date(
      this.createForm.get("endRegistrationDate")?.value
    );
    let startDate: any = new Date(this.createForm.get("startDate")?.value);
    let endDate: any = new Date(this.createForm.get("endDate")?.value);

    const oneHourInMs = 60 * 60 * 1000;
    const oneDayInMs = 24 * 60 * 60 * 1000;

    // Critère 1 : La date de fin d'enregistrement doit être supérieure d'au moins un jour à la date actuelle
    if (endRegistrationDate.getTime() < now.getTime() + oneDayInMs) {
      this.createForm.controls["endRegistrationDate"].setErrors({
        atLeastOneDayFromNow: true,
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

    // Critère 1 : Validation: La date de fin d'enregistrement doit être supérieure d'au moins une heure à la date de début d'enregistrement
    if (endRegistrationDate.getTime() < startRegistrationDate.getTime() + oneHourInMs) { // 3600000 ms = 1 heure
      this.createForm.controls['endRegistrationDate'].setErrors({
          atLeastOneHourAfterStartRegistration: true,
      });
    }

    if (this.createForm.invalid) {
      return;
    }
    // Convertir les dates du formulaire en localDateTime
    startRegistrationDate = new Date(
      this.createForm.get("startRegistrationDate")?.value
    ).toISOString();
    endRegistrationDate = new Date(
      this.createForm.get("endRegistrationDate")?.value
    ).toISOString();
    startDate = new Date(this.createForm.get("startDate")?.value).toISOString();
    endDate = new Date(this.createForm.get("endDate")?.value).toISOString();
    const formData = {
      ...this.createForm.value,
      startRegistrationDate,
      endRegistrationDate,
      startDate,
      endDate,
    };
    this.waitingResponse = true;
    this.arcadeServ
      .create(formData)
      .then(() => {
        this.submitted = false;
        this.waitingResponse = false;
        this.createForm.reset();
        this.router.navigate(["/arcarde/list-arcarde"]);
      })
      .catch((error) => {
        if (
          error.includes("Arcade already exists") ||
          error.errors?.alreadyUsed
        )
          this.createForm.controls["name"].setErrors({ used: true });
        this.submitted = false;
        this.waitingResponse = false;
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
