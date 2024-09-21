import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { State } from 'src/app/shared/entities/state.enum';
import { SpeakService } from 'src/app/shared/services/speak/speak.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { GameManagerService } from '../../service/game-manager.service';
import { Socket } from 'ngx-socket-io';
import { Word } from 'src/app/shared/entities/word';
import { BehaviorSubject, Observable } from 'rxjs';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Competition } from '../../../arcarde/competition/competititon-list/sub-competition/sub-competition.component';

@Component({
  selector: 'app-competition-playing',
  templateUrl: './competition-playing.component.html',
  styleUrls: ['./competition-playing.component.css']
})
export class CompetitionPlayingComponent implements OnInit {
  @ViewChild('circularProgress') circularProgress: ElementRef;
  @Input() competition : SousCompetion;

  lifesLength: number[] = [];
  errorMsg: string = '';
  // wordEntry: string = '';
  showBadMsg: boolean = false;
  showGoodMsg: boolean = false;
  wordForm: FormGroup;
  state = State;
  isWaitingPlayer: boolean;
  players: any[] = [];
  playerId: string;
  eligibleToPlay: boolean = false;
  fetching: boolean = false;
  submitted: boolean = false;
  expectedWord: Word;
  modalElement: Element;
  gameRoundStep: number = 0;
  gamePartID: string;
  timer: any;
  startingTimer: any;
  timeLeft: number = 0;
  timeLeftToStart: number = 0;
  validEntry: boolean = true;
  timeOver: boolean = false;
  hasLostGame: boolean = false;
  starting: boolean = false;
  playing: boolean = false;
  currentPlayerId: string;
  currentPartID: string;
  currentPart: any;
  
  
  playerEligibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  playerEligible$: Observable<boolean> = this.playerEligibleSubject.asObservable();

  constructor(
    public gameManager: GameManagerService,
    private speakService: SpeakService,
    private fb: FormBuilder,
    private socket:Socket,
    private userService: UserService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    @Inject('competitionData') competitionData: Competition
  ) {
    this.competition = competitionData;  
    this.playerEligible$.subscribe((eligible: boolean) => {
      this.eligibleToPlay = eligible;
      // this.eligibleToPlay = !eligible;
      // this.starting = true;
      // this.playing = true;
      if(eligible) {
        this.startTimer(true);
      }
    });
    this.socket.on('join-game', (data)=>{
      this.players = (data.filter((game) => {
        return (game.competition._id == this.competition._id)
      })).map((game) => { 
          if(game.player._id == this.playerId)
            this.lifesLength = new Array(game.player.lifeGame);
          return {_id: game.player._id, name:`${game.player.firstName} ${game.player.lastName}`}
      })
    });
    this.socket.on('new-player', (data)=>{
      this.playerEligibleSubject.next(this.playerId === data.player);
    });
    this.socket.on("game-play", (data: { gameRound: any; gameWord: Word; player: string; gameRoundStep: number; gamePartID: string; }) => {
      this.playerEligibleSubject.next(this.playerId === data.player);
      this.currentPlayerId = data.player;
      this.expectedWord = data.gameWord;
      this.gameRoundStep = data.gameRoundStep;
      this.resetFormData();
      this.starting = false;
      this.playing = true;
      this.startingGame();
      if(this.playerId === data.player) 
        this.pronounceWord()
    });
    this.socket.on('game-play-error', () => {
      this.resetFormData();
    })
    this.socket.on("game-player-lifegame",(data: any) => {
      if(data.competitionID == this.competition._id) {
        if (data.lifeGame == 0) 
          this.lostGame(data.player);
        else if(this.playerId === data.player)  
          this.lifesLength.shift();
      }
    });
    this.socket.on('game-statechange', (data)=> {
      this.resetFormData();
      this.currentPartID = data.partID;
      this.currentPart = this.competition.gameParts.find(p => p._id == data.partID);
      if((this.competition._id == data.competitionID))
        this.competition.gameState = data.gameState;
      if(data.gameState === this.state.RUNNING) 
        this.startingGame();
      else if(data.gameState === this.state.END) {
        this.playerEligibleSubject.next(false);
        clearInterval(this.startingTimer);
        this.playing = false;
      }
      else if(data.gameState === this.state.WAITING_PLAYER)
        this.playerEligibleSubject.next(false);
    });
    this.socket.on('leave-game', ()=> {
      this.fetching = false;
      this.submitted = false;
      $(`#cancel-btn`).click();
    });
  }
  ngOnInit(): void {
    this.playerId = this.userService.getLocalStorageUser()._id;
    this.initForm();
    // this.startingGame();
    this.currentPart = this.competition.gameParts.find(p => p.gameState == this.state.RUNNING ||  p.gameState == this.state.WAITING_PLAYER);
    this.currentPartID = this.currentPart._id; 
  }

  startingGame() {
    this.starting = true;
    clearInterval(this.startingTimer);
    this.timeLeftToStart = this.competition.maxTimeToPlay;
    this.startingTimer = setInterval(() => {
      if (this.timeLeftToStart > 0) {
        this.timeLeftToStart--;
        this.updateCircularProgress();
        return;
      } else {
        this.starting = false;
        this.playing = true;
        clearInterval(this.startingTimer);
      }
    }, 1000);
  }
  updateCircularProgress() {
    const progressAngle = (this.timeLeftToStart / this.competition.maxTimeToPlay) * 360;
    this.circularProgress.nativeElement.style.background = `conic-gradient(#3063AD ${progressAngle}deg, #ededed 0deg)`;
  }
  lostGame(playerId: string) {
    this.players = this.players.filter(p => p._id !== playerId);
    if(this.playerId === playerId) 
      this.hasLostGame = true;

  }
  resetFormData(){
    this.fetching = false;
    this.submitted = false;
    this.wordForm.reset();
    this.checkTimer();
  }
  pronounceWord() {
    this.speakService.speak(this.expectedWord.name, this.expectedWord.type);
  }

  initForm() {
    this.wordForm = this.fb.group({
      word: ['', Validators.required],
    });

    // this.wordForm.valueChanges.subscribe((data) => {
    //   this.wordEntry = data.word;
    // });
  }

  startTimer(init: boolean = false) {
    clearInterval(this.timer);
    const storedEndTime = localStorage.getItem('endTime');
    
    if (storedEndTime && !init) {
      // Calculer le temps restant en comparant l'heure actuelle et l'heure de fin stockée
      const now = new Date().getTime();
      const endTime = parseInt(storedEndTime, 10);
      const timeDifference = Math.floor((endTime - now) / 1000); // Différence en secondes
  
      if (timeDifference > 0) {
        this.timeLeft = timeDifference; // Temps restant basé sur la différence
      } else {
        this.timeLeft = 0; // Si la différence est négative, le temps est écoulé
        localStorage.removeItem('endTime'); // Nettoyer le stockage si terminé
      }
    } else {
      // Nouveau compte à rebours
      this.timeLeft = this.competition.maxTimeToPlay;
      const endTime = new Date().getTime() + this.timeLeft * 1000; // Calculer le timestamp de fin
      localStorage.setItem('endTime', endTime.toString()); // Stocker l'heure de fin
    }
  
    // Initialiser le timer
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        return;
      } 
      else if (!this.validEntry) {
        // Gestion des vies ou d'autres éléments si nécessaire
        // this.lifesLength.pop();
      }
      // Appeler la méthode pour vérifier l'état du compte à rebours
      this.checkTimer();
      // Si le temps est écoulé, effacer la valeur du localStorage
      clearInterval(this.timer);
      localStorage.removeItem('endTime');
    }, 1000);  // Chaque seconde (1000 ms)
  }
  

  checkEntry() {
    const enteredWord = this.wordForm.get('word')?.value
    this.validEntry = !enteredWord.length ? true : (enteredWord.toLowerCase() === this.expectedWord.name?.toLowerCase());
  }
  
  checkTimer() {
    this.timeOver = this.timeLeft <= 0;
  }

  leaveGame() {
    this.fetching = true;
    this.submitted = true;
    this.gameManager.leaveGame({
      playerID: this.playerId,
      competitionID: this.competition._id
    });
  }

  sendWord() {
    if(this.wordForm.valid) {
      this.fetching = true;
      this.submitted = true;
      clearInterval(this.timer);
      this.gameManager.sendWord({
        word: this.wordForm.get('word')?.value,
        playerID: this.playerId,
        competitionID: this.competition._id,
        gameRoundStep: this.gameRoundStep,
        gamePartID: this.currentPartID,
      });
    }
  }
  closeModal() {
    this.modalService.dismissAll();
    this.gameManager.modalOpenSubject.next(false);
  }
}
