import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GamePartsService } from '../list-parts/service/game-parts.service';
import { min } from 'rxjs';

@Component({
  selector: 'app-create-part-modal',
  templateUrl: './create-part-modal.component.html',
  styleUrls: ['./create-part-modal.component.css'],
})
export class CreatePartModalComponent implements OnInit {
  @Input() competitionId: string;

  loading: boolean = false;
  fetching: boolean = false;
  submitted: boolean = false;

  MinLength = 4;
  MaxLength = 64;
  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public gamePartService: GamePartsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.createForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(65),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(65),
        ],
      ],
      gameCompetitionID: [this.competitionId, Validators.required],
      numberOfWord: ['', [
        Validators.required,
        Validators.min(2)
      ]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }
  nameChanged() {
    delete this.createForm.controls['name'].errors?.['used'];
  }

  addPart() {
    this.submitted = true;
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0, donc ajoutez 1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    if (this.createForm.get('startDate')?.value < formattedDate)
      this.createForm.controls['startDate'].setErrors({
        atLeastOneHourAfterNow: true,
      });
    if (
      this.createForm.get('endDate')?.value <
      this.createForm.get('startDate')?.value
    )
      this.createForm.controls['endDate'].setErrors({
        laterThanStartDate: true,
      });

    if (this.createForm.invalid) {
      console.log(this.createForm.controls);
      console.log(this.createForm.value);
      return;
    }
    this.fetching = true;
    this.gamePartService
      .AddGamePart(this.createForm.value)
      .then(() => {
        this.submitted = false;
        this.fetching = false;
        this.gamePartService.partListChangedSubject.next(true);
        this.initForm();
        $(`#cancel-btn00-${this.competitionId}`).click();
      })
      .catch((error) => {
        if (
          error.includes('The given name is already used') ||
          error.errors?.alreadyUsed
        )
          this.createForm.controls['name'].setErrors({ used: true });
        this.submitted = false;
        this.fetching = false;
      });
  }

  onDateTimeChange(newValue: string, control) {
    this.createForm.get(control).setValue(newValue);
  }
}
