import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AllModulesService } from 'src/app/services/all-modules.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { WordsService } from 'src/app/shared/services/words/words.service';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { Level } from 'src/app/shared/entities/level';
import { SpeakService } from 'src/app/shared/services/speak/speak.service';
import { Word } from 'src/app/shared/entities/word';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordDataService } from '../word-data.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit, OnChanges, OnDestroy {
  public wordsList: [] = [];
  public levelList: [] = [];
  errorMessage: any;
  public tempId: any;
  waiting: boolean = false;
  waitingResponse: boolean = false;
  submitted: boolean = false;
  wordData: any = '';
  level: Level;
  wordForm: FormGroup;
  routerSubscribe: any;
  minDescLength: number = 4;
  url;
  wordTypes = [
    {name: "Francais", value: 'fr'},
    {name: "English", value: 'en'}
  ]


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private translationService: TranslationService,
    private formLog: FormBuilder,
    private wordsService: WordsService,
    private levelService: LevelService,
    private toastr: ToastrService,
    private wordDataService: WordDataService,
    private speakService: SpeakService) 
  {
    this.routerSubscribe = router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.wordsList = undefined;
      }
    });
  }

  ngOnInit(): void {

    this.wordDataService.words$.subscribe(async (words: any) => {
      this.wordsList = await words;
    });
    this.wordDataService.wordFetching$.subscribe((value: any) => {
      this.waitingResponse = value;
    })
    this.wordDataService.currentLevel$.subscribe((value: any) => {
      this.level = value;
    })
    this.wordDataService.levels$.subscribe((data: any) => {
      this.levelList = data.levels;
    })
    this.translate.use(this.translationService.getCurrentLanguage());
    this.initUpdateForm();
  }

  initUpdateForm() {
    this.wordForm = this.formLog.group({
      '_id': [this.wordData._id, Validators.compose([
        Validators.required])],
      'name': [this.wordData.name, Validators.compose([
        Validators.required])],
      'description': [this.wordData.description, Validators.compose([
        Validators.required,
        Validators.minLength(this.minDescLength)])],
      'gameLevelId': [this.wordData.gamelevelId, Validators.compose([
        Validators.required])],
      'type': [this.wordData.type, Validators.compose([
        Validators.required])],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.wordData && this.wordForm) {
      this.wordData = changes.wordData.currentValue;
      this.wordForm.controls._id.setValue(this.wordData._id);
      this.wordForm.controls.name.setValue(this.wordData.name);
      this.wordForm.controls.description.setValue(this.wordData.description);
      this.wordForm.controls.gameLevelId.setValue(this.wordData.gamelevelId);
    }
  }

  ngOnDestroy() {
    this.routerSubscribe.unsubscribe();
  }

  refreshList(refeshLevelsList: boolean = true) {
    this.wordDataService.listWordBylevel(this.level._id, refeshLevelsList);
  }

  filter() { }

  deleteWord(word) {
    this.waiting = true;
    this.wordsService.deleteWord(word, this.level._id)
      .then(() => {
        this.waiting = false;
        this.refreshList();
        $('#cancel-btn00').click();
      })
      .catch((error) => {
        this.waiting = false;
        this.toastr.error(error.message, 'Error', { timeOut: 10000 });
      });
  }

  speak(word: Word) {
    if (word.name && word.name != undefined) {
      this.speakService.speak(word.name, word.type);
    } else {
      this.toastr.warning('', "Can't read word");
    }
  }

  editeWord() {
    this.waiting = true;
    this.submitted = true;
    if(this.wordForm.invalid)
      return;
    this.wordsService.updateWord(this.wordForm.value)
      .then(() => {
        this.submitted = false;
        this.refreshList(false);
        this.waiting = false;
        this.initUpdateForm();
        $('#close-edit-modal').click();
      })
      .catch((error) => {
        this.waiting = false;
        this.submitted = false;
      });
  }

  get f() {
    return this.wordForm.controls;
  }

  updateForm(word) {
    this.wordForm.controls._id.setValue(word._id);
    this.wordForm.controls.name.setValue(word.name);
    this.wordForm.controls.description.setValue(word.description);
    this.wordForm.controls.gameLevelId.setValue(this.level._id);
    this.wordForm.controls.type.setValue(word.type);
  }
}
