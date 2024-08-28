import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ArcardeService } from '../services/arcarde.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-arcarde',
  templateUrl: './create-arcarde.component.html',
  styleUrls: ['./create-arcarde.component.css'],
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
  ) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isOnlineGame: [false, Validators.requiredTrue],
      canRegisterPlayer: [true],
      isFreeRegistrationPlayer: [false],
      maxPlayersNumber: ['', [
        Validators.min(2),
        Validators.max(100),
        Validators.required
      ]],
      startRegistrationDate: ['', Validators.required],
      endRegistrationDate: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  createArcarde() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0, donc ajoutez 1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    if (this.createForm.get('startRegistrationDate')?.value < formattedDate)
      this.createForm.controls['startRegistrationDate'].setErrors({
        laterThanToday: true,
      });
    if (
      this.createForm.get('endRegistrationDate')?.value <
      this.createForm.get('startRegistrationDate')?.value
    )
      this.createForm.controls['endRegistrationDate'].setErrors({
        laterThanStartRegistrationDate: true,
      });
    if (
      this.createForm.get('startDate')?.value <
      this.createForm.get('endRegistrationDate')?.value
    )
      this.createForm.controls['startDate'].setErrors({
        laterThanEndRegistrationDate: true,
      });
    if (
      this.createForm.get('endDate')?.value <
      this.createForm.get('startDate')?.value
    )
      this.createForm.controls['endDate'].setErrors({
        laterThanStartDate: true,
      });

    if (this.createForm.invalid) {
      return;
    }
    this.waitingResponse = true;
    this.arcadeServ.create(this.createForm.value)
    .then(() => {
      this.submitted = false;
      this.waitingResponse = false;
      this.createForm.reset();
      this.router.navigate(['/arcarde/list-arcarde'])
    })
    .catch((error) => {
      if(error.includes('Arcade already exists') || error.errors?.alreadyUsed)
        this.createForm.controls['name'].setErrors({ used: true });
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
