import { Injectable } from '@angular/core';
import { WordsService } from 'src/app/shared/services/words/words.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { Level } from 'src/app/shared/entities/level';

@Injectable({
  providedIn: 'root'
})
export class WordDataService {

  private wordListSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  words$: Observable<any[]> = this.wordListSubject.asObservable();
  
  private levelListSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  levels$: Observable<any[]> = this.levelListSubject.asObservable();
  
  private wordFetchingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  wordFetching$: Observable<boolean> = this.wordFetchingSubject.asObservable();
  
  private levelFetchingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  levelFetching$: Observable<boolean> = this.levelFetchingSubject.asObservable();
  
  currentLevelSubject: BehaviorSubject<Level> = new BehaviorSubject<Level>(null);
  currentLevel$: Observable<Level> = this.currentLevelSubject.asObservable();
  
  constructor(
    private wordService: WordsService,
    private levelService: LevelService,
  ) { }
  
  updateWordList(words: any[]): void {
    this.wordListSubject.next(words);
  }
  
  listWordBylevel(levelId, refeshLevelsList: boolean = true): void {
    this.wordFetchingSubject.next(true);
    this.wordService.getWordListBylevel(levelId, true).then(response => {
      this.updateWordList(response);
      if(refeshLevelsList)
        this.getLevels();
      this.wordFetchingSubject.next(false);
    }, () => {
      this.wordFetchingSubject.next(false);
    });
  }
  
  updateLevelList(levels: any[]): void {
    this.levelListSubject.next(levels);
  }
  
  getLevels(): void {
    this.levelFetchingSubject.next(true);
    this.levelService.getAllLevels(true).then(response => {
      this.updateLevelList(response);
      this.levelFetchingSubject.next(false);
    }, () => {
      this.levelFetchingSubject.next(false);
    });
  }
}
