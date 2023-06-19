import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AllModulesService } from 'src/app/services/all-modules.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { WordsService } from 'src/app/shared/services/words/words.service';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { Level } from 'src/app/shared/entities/level';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {
  public wordsList: any = [];
  errorMessage: any;
  public tempId: any;
  levelId: string = '';
  wating = true;
  wordData?: any = '';
  level : Level;
  url;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private translationService: TranslationService,
    private srvModuleService: AllModulesService,
    location: Location,
    private wordsService: WordsService,
    private levelService: LevelService,
    private toastr: ToastrService) { 
    }

  ngOnInit(): void {
    this.scrollToTop();
    this.translate.use(this.translationService.getLanguage());
    this.levelId = this.route.snapshot.params['id'];
    console.log('levelId: ' + this.levelId);
    this.levelService.getLevelById(this.levelId)
    .then((response) => {
      this.level =  response
      console.log('Level 00000: ', response)
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event instanceof NavigationStart) {
          let splitVal = event.url.split('/');
          this.levelId = splitVal[3];
          console.log("splitVal: ", this.levelId)
        }
      }
    });
    // this.url = this.location.path();
    // if (this.url) {
    //   let splitVal = this.url.split('/');
    //   if (splitVal[3] != undefined) {
    //     this.levelId = splitVal[3];
    // } else {
    //   this.levelId = 'sdfsdfsd';
    // }
    // }

    // this.wordsList = localStorage.getItem('words-list');
    this.wordsList = this.wordsService.getWordListBylevel(this.levelId)
      .then((result) => {
        this.wordsList = result;
        this.wating = true;
      })
      .catch((error) => {
        this.wating = false;
      });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  refreshList() {
    this.wating = true;
    this.wordsService.getWordListBylevel(this.levelId)
      .then((result) => {
        this.wordsList = JSON.parse(localStorage.getItem(this.levelId));
        // setTimeout(() => {
        this.wating = false;
        // }, 3000);
      })
      .catch((error) => {
        console.error('Erreur: ', error.message);
        this.wating = false;
      });
  }

  filter() { }

  deleteWord(word) {
    this.wating = true;
    this.wordsService.deleteWord(word)
      .then((result) => {
        // setTimeout(() => {
        this.refreshList();
        this.wating = false;
        // }, 3000);
      })
      .catch((error) => {
        console.error('Erreur: ', error.message);
        this.toastr.error(error.message, 'Error', { timeOut: 10000 });
        this.wating = false;
      });
  }

}
