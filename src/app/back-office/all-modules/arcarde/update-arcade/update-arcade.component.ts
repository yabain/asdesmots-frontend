import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ArcardeService } from '../services/arcarde.service';

@Component({
  selector: 'app-update-arcade',
  templateUrl: './update-arcade.component.html',
  styleUrls: ['./update-arcade.component.css']
})
export class UpdateArcadeComponent implements OnInit {
  arcadeData: Arcarde = new Arcarde();
  updateForm: FormGroup;
  waitingResponse: boolean = false;
  arcadeId: string = '';
  submitted: boolean = false;
  loading: boolean = true;
  constructor(
    public arcadeServ: ArcardeService,
    public userServ: UserService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.arcadeId = this.activatedRoute.snapshot.paramMap.get('arcadeId');
  }

  ngOnInit(): void {
    this.initdata();
  }
  initdata(){
    this.arcadeServ
      .getArcardeById(this.arcadeId)
      .then((resp: any) => {
        this.arcadeData = resp.data;
    this.updateForm = this.fb.group({
      name: [this.arcadeData.name, Validators.required],
      description: [this.arcadeData.description, Validators.required],
      isOnlineGame: [this.arcadeData.isOnlineGame, Validators.requiredTrue],
      canRegisterPlayer: [this.arcadeData.canRegisterPlayer],
      isFreeRegistrationPlayer: [this.arcadeData.isFreeRegistrationPlayer],
      maxPlayersNumber: [this.arcadeData.maxPlayersNumber, [
        Validators.min(2),
        Validators.max(100),
        Validators.required
      ]],
      startRegistrationDate: [this.formatDateTime(this.arcadeData.startRegistrationDate), Validators.required],
      endRegistrationDate: [this.formatDateTime(this.arcadeData.endRegistrationDate), Validators.required],
      startDate: [this.formatDateTime(this.arcadeData.startDate), Validators.required],
      endDate: [this.formatDateTime(this.arcadeData.endDate), Validators.required],
    });
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
      });
  }
  formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
  
    const yyyy = date.getFullYear();
    const MM = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois (1-12)
    const dd = date.getDate().toString().padStart(2, '0'); // Jour (1-31)
    const hh = date.getHours().toString().padStart(2, '0'); // Heures (00-23)
    const mm = date.getMinutes().toString().padStart(2, '0'); // Minutes (00-59)
  
    return `${yyyy}-${MM}-${dd} ${hh}:${mm}`;
  };
  nameChanged() {
    delete this.updateForm.controls['name'].errors?.['used'];
  }
  updateArcarde() {
    this.submitted = true;
    console.log('date ',this.updateForm.get('endRegistrationDate')?.value);
    if (this.updateForm.invalid) {
      return;
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0, donc ajoutez 1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    if (this.updateForm.get('startRegistrationDate')?.value < formattedDate)
      this.updateForm.controls['startRegistrationDate'].setErrors({
        laterThanToday: true,
      });
    if (
      this.updateForm.get('endRegistrationDate')?.value <
      this.updateForm.get('startRegistrationDate')?.value
    )
      this.updateForm.controls['endRegistrationDate'].setErrors({
        laterThanStartRegistrationDate: true,
      });
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
    this.waitingResponse = true;
    this.arcadeServ.update(this.updateForm.value, this.arcadeId)
    .then(() => {
      this.submitted = false;
      this.waitingResponse = false;
      this.updateForm.reset();
      this.router.navigate(['/arcarde/list-arcarde'])
    })
    .catch((error) => {
      if(error.includes('Arcade already exists') || error.errors?.alreadyUsed)
        this.updateForm.controls['name'].setErrors({ used: true });
      this.submitted = false;
      this.waitingResponse = false;
    });
  }

  toggleCheckbox(control: string) {
    this.updateForm
      .get(control)
      ?.setValue(!this.updateForm.get(control)?.value);
  }

  onDateTimeChange(newValue: string, control) {
    this.updateForm.patchValue({
      [control]: event
    });
    this.updateForm.get(control).setValue(newValue);
  }
}
