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

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit, OnChanges, OnDestroy {
  public wordsList: any = [];
  errorMessage: any;
  public tempId: any;
  levelId: string = '';
  waiting: boolean = false;
  wordData: any = '';
  haveToShow: boolean = false;
  level: Level;
  wordForm: FormGroup;
  routerSubscribe: any;
  levelList;
  url;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private translationService: TranslationService,
    private formLog: FormBuilder,
    private srvModuleService: AllModulesService,
    private location: Location,
    private wordsService: WordsService,
    private levelService: LevelService,
    private toastr: ToastrService,
    private speakService: SpeakService) {

    this.routerSubscribe = router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.waiting = true;
        this.wordsList = undefined;
        this.getLevelIdToUrl();
        this.refreshList();
        // this.findLevelById(this.levelId);
        this.scrollToTop();
        setTimeout(() => {
          this.getWordListBylevel(this.levelId);
        }, 1000);
      }
    });
  }

  ngOnInit(): void {

    this.translate.use(this.translationService.getCurrentLanguage());
    // this.getLevelIdToUrl();
    // this.findLevelById(this.levelId);
    // this.getWordListBylevel(this.levelId);
    // console.log("wordData00: ", this.wordData)
    this.initUpdateForm();
  }

  initUpdateForm() {
    this.wordForm = this.formLog.group({
      '_id': [this.wordData._id, Validators.compose([
        Validators.required,
        Validators.minLength(1)])],
      'name': [this.wordData.name, Validators.compose([
        Validators.required,
        Validators.minLength(1)])],
      'description': [this.wordData.description, Validators.compose([
        Validators.required,
        Validators.minLength(1)])],
      'gameLevelId': [this.wordData.gamelevelId, Validators.compose([
        Validators.required,
        Validators.minLength(1)])],
      'type': [this.wordData.type, Validators.compose([
        Validators.required,
        Validators.minLength(1)])],
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

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  getLevelIdToUrl() {
    if (this.route.snapshot.params['id'] && this.route.snapshot.params['id'] != undefined) {
      this.levelId = this.route.snapshot.params['id'];
      console.log("new levelId: ", this.levelId);
    } else {
      // this.levelId = JSON.parse(localStorage.getItem('levels-list'))[0]._id;
      // console.log("first levelId: ", this.levelId);
      // if (!this.levelId) {
      //   console.log("no levelId: ", this.levelId);
      this.haveToShow = false
      this.waiting = false;
      // }
    }
  }

  refreshList() {
    if(this.levelId){
      this.waiting = true;
      this.wordsService.getWordListBylevel(this.levelId, true)
        .then((result) => {
          this.wordsList = result;
          this.levelService.getAllLevels(true).then((data) => {
            this.levelList = data.levels;
            this.level = this.levelList.find(elem => elem._id == this.levelId)
          });
          this.waiting = false;
        })
        .catch((error) => {
          console.error('Erreur: ', error.message);
          this.waiting = false;
        });
    }
  }

  filter() { }

  deleteWord(word) {
    this.waiting = true;
    console.log('Deleting word: ', word);
    this.wordsService.deleteWord(word, this.levelId)
      .then((result) => {
        this.refreshList();
        this.waiting = false;
        $('#cancel-btn00').click();
      })
      .catch((error) => {
        console.error('Erreur: ', error.message);
        this.toastr.error(error.message, 'Error', { timeOut: 10000 });
        this.waiting = false;
      });
  }

  findLevelById(levelId) {
    this.levelService.getLevelById(levelId)
      .then((response) => {
        this.level = response
        // this.waiting = false;
      })
      .catch((erro) => {
        // this.waiting = false;
      });
  }

  getWordListBylevel(levelId) {
    this.waiting = true;
    if (levelId && levelId != undefined) {
      this.wordsList = this.wordsService.getWordListBylevel(levelId)
        .then((result) => {
          console.log('0000: ', result);
          if (result.length > 0) {
            this.haveToShow = true
          } else { this.haveToShow = false }
          this.wordsList = result;
          this.waiting = false;
        })
        .catch((error) => {
          // console.log("55555: ", error);
          this.toastr.warning('Can not get word list', 'Warning', { timeOut: 20000 });
          this.haveToShow = false;
          this.waiting = false;
        });
    } else {
      this.haveToShow = false;
      this.waiting = false;
    }
  }

  speak(word: Word) {
    if (word.name && word.name != undefined) {
      this.speakService.speak(word.name, word.type);
    } else {
      this.toastr.warning('', "Can't read word");
    }
  }

  editeWord() {
    if(this.wordForm.invalid)
      return;
      
    this.waiting = true;
    console.log("General datas: ", this.wordForm.value);
    this.wordsService.updateWord(this.wordForm.value)
      .then((result) => {
        this.waiting = false;
        this.refreshList();
        this.initUpdateForm();
        $('#close-edit-modal').click();
      })
      .catch((error) => {
        this.waiting = false;
      });
  }

  get f() {
    return this.wordForm.controls;
  }

  updateForm(word) {
    this.wordForm.controls._id.setValue(word._id);
    this.wordForm.controls.name.setValue(word.name);
    this.wordForm.controls.description.setValue(word.description);
    this.wordForm.controls.gameLevelId.setValue(this.levelId);
    this.wordForm.controls.type.setValue(word.type);
  }
}
