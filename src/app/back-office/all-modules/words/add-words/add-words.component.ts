import { Component, OnInit, TemplateRef } from '@angular/core';
// import { CommonServiceService } from 'src/app/services/common-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { WordsService } from 'src/app/shared/services/words/words.service';
import { ErrorsService } from 'src/app/shared/services/errors/errors.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.css']
})
export class AddWordsComponent implements OnInit {


  public pipe = new DatePipe("en-US");
  public wordForm!: FormGroup;
  levelList?: any = '';
  allWordsLevels?: any;
  addingWords: boolean = false;
  submitted: boolean = false;
  waitingResponse = false;
  minDescLength: number = 4;
  wordTypes = [
    {name: "Francais", value: 'fr'},
    {name: "English", value: 'en'}
  ]

  constructor(public router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private formLog: FormBuilder,
    private levelService: LevelService,
    private wordService: WordsService,
    private translationService: TranslationService,
    private errorsService: ErrorsService,
    private location: Location) {
    this.waitingResponse = true;

    if (!localStorage.getItem('levels-list')) {
      this.levelService.getAllLevels()
        .then((data) => {
          this.levelList = data.levels;
          this.allWordsLevels = data.levels;
          console.log('levelList good: ', this.levelList);
          this.waitingResponse = false;
        });
    }
    else {
      const data = JSON.parse(localStorage.getItem('levels-list'));
      this.levelList = data.levels;
      this.allWordsLevels = data.levels;
      this.waitingResponse = false;
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.translate.use(this.translationService.getCurrentLanguage());
    this.scrollToTop();

    this.wordForm = this.formLog.group({
      'name': ['', Validators.required
      ],
      'description': ['',[
        Validators.required,
        Validators.minLength(4)]
      ],
      'gameLevelId': [, Validators.compose([
        Validators.required])
      ],
      'type': [, Validators.required]
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }


  addWords() {
    if (this.wordForm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.waitingResponse = true
      this.wordService.createWord(this.wordForm.value)
      .then(() => {
        // this.refreshList();
        this.addingWords = false;
        this.submitted = false;
        this.waitingResponse = false;
        $('#create-cancel-btn').click();
        this.wordForm.reset();
      })
      .catch((error) => {
        // console.log('fr form: ', this.wordFrForm.value);
        this.errorsService.errorsInformations(error, 'add french word');
        this.addingWords = false;
        this.submitted = false;
        this.waitingResponse = false;
      });
    }
  }

  removeWordListInLevel() {
    for (let i = 0; i < this.levelList.length; i++) {
      // console.log("test id key", this.levelList[i]._id);
      localStorage.removeItem(this.levelList[i]._id);
    }
  }
  
  get f() {
    return this.wordForm.controls;
  }

  backClicked() {
    this.location.back();
  }
}
