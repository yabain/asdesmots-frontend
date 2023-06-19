import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-level-details',
  templateUrl: './level-details.component.html',
  styleUrls: ['./level-details.component.css'],
})
export class LevelDetailsComponent implements OnInit, OnChanges {
  @Input() levelData?: any;
  @Input() isAdmin?: boolean = true;
  @Input() isEditable?: boolean = true;

  levelForm: FormGroup;
  waitingResponse = false;
  submitted = false;

  constructor(
    private levelService: LevelService,
    private translate: TranslateService,
    private translationService: TranslationService,
    private formLog: FormBuilder,
    private toastr: ToastrService,
  ) {
    if (!this.levelData) {
      this.levelData = this.levelService.getAllLevels();
      console.log("user details1: ", this.levelData);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.level && this.levelForm) {
      this.levelData = changes.levelData.currentValue;
      this.levelForm.controls.name.setValue(this.levelData.name);
      this.levelForm.controls.description.setValue(this.levelData.description);
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.scrollToTop();
    this.translate.use(this.translationService.getLanguage());
    console.log("level datas: ", this.levelData);

    this.levelForm = this.formLog.group({
      'id': [this.levelData.id, Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'name': [this.levelData.name, Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'description': [this.levelData.skype,  Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
    });


  }

  submitGeneral() {
    this.submitted = true;
    this.waitingResponse = true;
    console.log("General datas: ", this.levelForm.value);
    this.levelService.updateLevel(this.levelData.id, this.levelForm.value)
    .then((result) => {
          this.toastr.success('General informations saved!', 'Done', { timeOut: 10000 });
          this.submitted = false;
          this.waitingResponse = false;
    })
    .catch((error) => {
      this.waitingResponse = false;
      this.submitted = false;
    });
  }

}
