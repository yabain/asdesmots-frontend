import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArcardeService } from '../services/arcarde.service';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { UserService } from 'src/app/shared/services/user/user.service';
import { LevelService } from 'src/app/shared/services/level/level.service';

@Component({
  selector: 'app-update-arcade',
  templateUrl: './update-arcade.component.html',
  styleUrls: ['./update-arcade.component.css'],
})
export class UpdateArcadeComponent implements OnInit {
  arcadSelectedData: Arcarde = new Arcarde();
  idArcad: string = '';
  formUpadate: FormGroup;

  constructor(
    public arcadeServ: ArcardeService,
    private translate: TranslateService,
    public userServ: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private translation: TranslationService,
    public level: LevelService,
    private fb: FormBuilder
  ) {
    this.translate.use(this.translation.getLanguage());
    this.arcadeServ.loadAllArcarde(), this.arcadeServ.initFormUpdateArcarde();
    this.getID();
  }

  ngOnInit(): void {}

  async loadListOfArcarde() {
    if (this.arcadeServ.listArcardeUser.length == 0) {
      this.arcadeServ.loadArcade();
    }
  }

  getID() {
    this.idArcad = this.route.snapshot.params['id'];
    this.arcadSelectedData = this.arcadeServ.getData(this.idArcad);
    this.initUpdatingForm(this.arcadSelectedData);
  }

  initUpdatingForm(data: Arcarde) {
    this.arcadeServ.initUpdatingValues(this.arcadSelectedData);
  }

  resetFormCreation() {
    this.arcadeServ.formUpdate.reset();
    this.router.navigateByUrl('/arcarde/list-arcarde');
  }

  backClicked() {
    this.resetFormCreation();
    this.location.back();
  }

  doUpdate() {
    this.arcadeServ.update(this.idArcad);
    this.location.back();
  }
}
