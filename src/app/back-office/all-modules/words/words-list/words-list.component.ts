import { Component, OnInit, ViewChild } from '@angular/core';
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
  wating : boolean = false;
  wordData?: any = '';
  haveToShow: boolean = false;
  level: Level;
  url;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private translationService: TranslationService,
    private srvModuleService: AllModulesService,
    private location: Location,
    private wordsService: WordsService,
    private levelService: LevelService,
    private toastr: ToastrService) {
      
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
        if (this.route.snapshot.params['id'] != undefined) {
          this.levelId = this.route.snapshot.params['id'];
          this.findLevelById(this.levelId);
          this.getWordListBylevel(this.levelId);
          console.log("new levelId: ", this.levelId)
        } else {
          this.levelId = 'sdfsdfsd';
        }
      }
        
      // router.events.forEach((event) => {
      //   if(event instanceof NavigationEnd) {
          // this.url = location.path();
          //   if (this.route.snapshot.params['id'] != undefined) {
          //     this.levelId = this.route.snapshot.params['id'];
          //     this.getLevelById(this.levelId);
          //     this.getWordListBylevel(this.levelId);
          //     console.log("new levelId: ", this.levelId)
          //   } else {
          //     this.levelId = 'sdfsdfsd';
          //   }
        // }

        // NavigationEnd
        // NavigationCancel
        // NavigationError
        // RoutesRecognized
      // });
      
    });
  }

  ngOnInit(): void {
    this.translate.use(this.translationService.getLanguage());
    this.levelId = this.route.snapshot.params['id'];
    console.log('levelId: ' + this.levelId);
    this.findLevelById(this.levelId);

    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
    //     if (event instanceof NavigationStart) {
    //       let splitVal = event.url.split('/');
    //       this.levelId = splitVal[3];
    //       console.log("splitVal: ", this.levelId)
    //     }
    //   }
    // });

    // this.wordsList = localStorage.getItem('words-list');
    this.getWordListBylevel(this.levelId);
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

  deleteWord(wordId) {
    this.wating = true;
    this.wordsService.deleteWord(wordId)
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

  findLevelById(levelId){
    this.wating = true;
    let level: Level = JSON.parse(localStorage.getItem('levels-list')).find((u) => u._id == levelId);
    this.level = level
    if (!this.level) {
    this.levelService.getLevelById(levelId)
      .then((response) => {
        this.level = response
        this.wating = false;
      })
      .catch((erro) =>{
        this.wating = false;
      });
    }
  }

  getWordListBylevel(levelId){
    this.wating = true;
    this.wordsList = this.wordsService.getWordListBylevel(levelId)
      .then((result) => {
        if (result.length > 0) {
          this.haveToShow = true
        } else { this.haveToShow = false }
        this.wordsList = result;
        this.wating = false;
      })
      .catch((error) => {
        this.wating = false;
      });

  }
}
