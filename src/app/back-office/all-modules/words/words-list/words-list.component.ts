import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AllModulesService } from 'src/app/services/all-modules.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { ActivatedRoute } from '@angular/router';
import { WordsService } from 'src/app/shared/services/words/words.service';

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

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private translationService: TranslationService,
    private srvModuleService: AllModulesService,
    private wordsService: WordsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.scrollToTop();
    this.translate.use(this.translationService.getLanguage());
    this.levelId = this.route.snapshot.params['id'];
    console.log('levelId: ' + this.levelId);

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
