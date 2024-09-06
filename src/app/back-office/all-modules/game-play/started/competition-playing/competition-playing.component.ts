import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { State } from 'src/app/shared/entities/state.enum';
import { SpeakService } from 'src/app/shared/services/speak/speak.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { GameManagerService } from '../../service/game-manager.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-competition-playing',
  templateUrl: './competition-playing.component.html',
  styleUrls: ['./competition-playing.component.css']
})
export class CompetitionPlayingComponent implements OnInit {

  @Input() competition : any;

  Life: number[] = [];
  restTime: number = 0;
  errorMsg: string = '';
  interval: any;
  wordEntry: string = '';
  showBadMsg: boolean = false;
  showGoodMsg: boolean = false;
  formword: FormGroup;
  state = State;
  isWaitingPlayer: boolean;
  players: any[] = [];
  playerId: string;

  constructor(
    public gameManager: GameManagerService,
    private speakService: SpeakService,
    private fb: FormBuilder,
    private socket:Socket,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.playerId = this.userService.getLocalStorageUser()._id;
    this.initForm();
    this.socket.on('join-game', (data)=>{
      this.players = (data.filter((game) => {
        return (game.competition._id == this.competition._id)
      })).map((game) => { 
          if(game.player._id == this.playerId)
            this.Life = new Array(game.player.lifeGame);
          return `${game.player.firstName} ${game.player.lastName}`
      })
    });
    this.socket.on('game-statechange', (data)=>{
      console.log(this.competition._id, data.competitionID)
      if((this.competition._id == data.competitionID) && (data.gamePart.gameState == this.state.RUNNING))
        this.competition.gameState = data.gameState;
    });
  }
  speak(word: string) {
    this.speakService.speak(word, 'fr');
  }

  initForm() {
    this.formword = this.fb.group({
      word: ['', Validators.required],
    });

    this.formword.valueChanges.subscribe((data) => {
      this.wordEntry = data.word;
    });
  }
  
  buildLifeList(maxPlayerLife: number, maxTimeToPlay: number) {
    let init = 0;
    this.Life.length = maxPlayerLife;
    this.Life.map((val) => (val = init++));

    this.restTime = maxTimeToPlay;
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.restTime > 0) {
        this.restTime--;
      } else {
        if (this.wordEntry === '' && this.wordEntry.length == 0) {
          this.showMessage('Time Out !! Echec.', true);
          this.onBadWord();
          this.pauseTimer();
        } else {
          this.checkWord();
        }
      }
    }, 1000);
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

  checkWord() {
    this.pauseTimer();
    console.log('wordentry', this.wordEntry);
    if (this.wordEntry !== '' && this.wordEntry.length !== 0) {
      if (this.wordEntry === 'exemple') {
        this.showMessage('Bonne reponse !', false);
      } else {
        this.showMessage('Echec mauvaise Reponse!', true);
        this.onBadWord();
      }
    } else {
      this.showMessage('Echec Aucune entree ! ', true);
    }
  }

  onBadWord() {
    this.Life.pop();
  }

  showMessage(msg: string, bad?: boolean) {
    this.errorMsg = msg;
    if (bad) {
      this.showBadMsg = true;
      this.showGoodMsg = false;
    } else {
      this.showGoodMsg = true;
      this.showBadMsg = false;
    }

    setTimeout(() => {
      this.showBadMsg = false;
      this.showGoodMsg = false;
    }, 2500);
  }

  reset() {
    this.formword.reset();
    this.wordEntry = '';
  }

  sendWord() {
    this.gameManager.sendWord({
      word: this.wordEntry,
      playerID: this.playerId,
    });
  }
}
