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
import { WordDataService } from '../word-data.service';
import { Level } from 'src/app/shared/entities/level';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.css']
})
export class AddWordsComponent implements OnInit {

  public pipe = new DatePipe("en-US");
  public wordForm!: FormGroup;
  levelList: [] = [];
  allWordsLevels?: any;
  addingWords: boolean = false;
  submitted: boolean = false;
  waiting = false;
  level: Level;
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
    private wordDataService: WordDataService,
    private location: Location) {
    if (!localStorage.getItem('levels-list')) {
      this.wordDataService.getLevels()
    }
    else {
      const data = JSON.parse(localStorage.getItem('levels-list'));
      this.levelList = data.levels;
      this.allWordsLevels = data.levels;
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.wordDataService.levels$.subscribe((data: any) => {
      this.levelList = data.levels;
    })
    this.wordDataService.currentLevel$.subscribe((value: any) => {
      this.level = value;
    })
    this.translate.use(this.translationService.getCurrentLanguage());
    this.scrollToTop();
    this.wordForm = this.formLog.group({
      'name': ['', Validators.required
      ],
      'description': ['',[
        Validators.required,
        Validators.minLength(4)]
      ],
      'gameLevelId': [this.level?._id, Validators.compose([
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
    if (this.wordForm.invalid) 
      return;
      
    this.submitted = true;
    this.waiting = true;
    this.wordService.createWord(this.wordForm.value)
    .then(() => {
      this.wordDataService.listWordBylevel(this.wordForm.get('gameLevelId')?.value);
      this.addingWords = false;
      this.submitted = false;
      this.waiting = false;
      $('#create-cancel-btn').click();
      this.wordForm.reset();
    })
    .catch((error) => {
      this.addingWords = false;
      this.submitted = false;
      this.waiting = false;
    });
  }
  
  get f() {
    return this.wordForm.controls;
  }

  backClicked() {
    this.location.back();
  }
}
