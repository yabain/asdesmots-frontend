import { TranslationService } from './../../../../shared/services/translation/language.service';
import { Component, OnInit } from '@angular/core';
import { GameplayService } from '../service/gameplay.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { SpeakService } from 'src/app/shared/services/speak/speak.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-started',
  templateUrl: './started.component.html',
  styleUrls: ['./started.component.css']
})
export class StartedComponent implements OnInit {
  competitionChoose: SousCompetion = new SousCompetion();
  Life: number[] = [];
  restTime: number = 0;
  errorMsg : string = '';
  interval: any;
  wordEntry: string = '';
  showBadMsg: boolean = false;
  showGoodMsg: boolean = false;
  formword: FormGroup;

  constructor( public gamePlay: GameplayService,
               private translate: TranslateService,
               private translation: TranslationService,
               private speakService: SpeakService,
               private fb: FormBuilder,
       ) { 
        this.initForm();
       }

  ngOnInit(): void {
  }

  speak(word: string){
      this.speakService.speak(word, 'fr');
  }

  initForm(){

    this.translate.use(this.translation.getLanguage());

    this.formword = this.fb.group({
      word: ['', Validators.required],
    });

    this.formword.valueChanges.subscribe((data)=>{
        this.wordEntry = data.word;
    });

  }
  buildLifeList(maxPlayerLife: number, maxTimeToPlay: number){
    let init = 0;
    this.Life.length = maxPlayerLife;
      this.Life.map((val)=> val = init++)

      this.restTime = maxTimeToPlay;
      this.startTimer();
  }
  
  startTimer() {
    this.interval = setInterval(() => {
      if(this.restTime > 0) {
        this.restTime--;
      } else {
          if(this.wordEntry === '' && this.wordEntry.length == 0){
            this.showMessage('Time Out !! Echec.', true);
            this.onBadWord();
            this.pauseTimer();
          }else{
            this.checkWord();
          }
      }
    },1000)
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

  checkWord(){
    this.pauseTimer();
    console.log('wordentry', this.wordEntry);
      if(this.wordEntry !== '' && this.wordEntry.length !== 0){
            if(this.wordEntry === 'exemple'){
              this.showMessage('Bonne reponse !', false);
            }else{
              this.showMessage('Echec mauvaise Reponse!', true);
              this.onBadWord();
            }
      }else{
            this.showMessage('Echec Aucune entree ! ', true);
      }
  }

  onBadWord(){
      this.Life.pop();
  }

  showMessage(msg: string, bad?: boolean){
  
    this.errorMsg = msg;
    if(bad){
      this.showBadMsg = true;
      this.showGoodMsg = false;
    }else{
      this.showGoodMsg = true;
      this.showBadMsg = false;
    }

    setTimeout(()=> {
        this.showBadMsg = false;
        this.showGoodMsg = false;
    }, 2500)
  }

  reset(){
    this.formword.reset();
    this.wordEntry = '';
  }
}
