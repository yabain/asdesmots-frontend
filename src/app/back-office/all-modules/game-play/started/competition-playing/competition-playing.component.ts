import { Component, Inject, Input, OnInit } from '@angular/core';
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

  @Input() competition : SousCompetion;

  lifesLength: number[] = [];
  errorMsg: string = '';
  wordEntry: string = '';
  showBadMsg: boolean = false;
  showGoodMsg: boolean = false;
  formword: FormGroup;
  state = State;
  isWaitingPlayer: boolean;
  players: any[] = [];
  playerId: string;
  eligibleToPlay: boolean = false;
  fetching: boolean = false;
  submitted: boolean = false;
  expectedWord: Word;
  modalElement: Element;
  currentPart: any;
  gameRoundStep: number;
  gamePartID: string;
  timer: any;
  timeLeft: number = 0; // Compte à rebours de 20 secondes
  validEntry: boolean = true;
  timeOver: boolean = false;
  hasLostGame: boolean = false;
  currentPlayerId: string;

  
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
      if(eligible) {
        this.startTimer();
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
      this.currentPart = this.competition.gameParts.find(p => p.gameState === (this.state.RUNNING || this.state.WAITING_PLAYER));
    });
    this.socket.on('game-play-error', () => {
      this.resetFormData();
    })
    this.socket.on("game-player-lifegame",(data: any) => {
      if(data.competitionID == this.competition._id) {
        if (data.lifeGame == 0) 
          this.lostGame(data.player);
        else if(this.playerId === data.player)  
          this.lifesLength = new Array(data.lifeGame);
      }
    });
    this.socket.on('game-statechange', (data)=> {
      this.resetFormData();
      if((this.competition._id == data.competitionID))
        this.competition.gameState = data.gameState;
    });
    this.socket.on('leave-game', ()=> {
      this.fetching = false;
      this.submitted = false;
      $(`#cancel-btn`).click();
    });
  }
  lostGame(playerId: string) {
    this.players = this.players.filter(p => p._id !== playerId);
    if(this.playerId === playerId) 
      this.hasLostGame = true;

  }
  resetFormData(){
    this.fetching = false;
    this.submitted = false;
    this.formword.reset();
    this.checkTimer();
  }
  ngOnInit(): void {
    this.playerId = this.userService.getLocalStorageUser()._id;
    this.initForm();
  }
  pronounceWord() {
    this.speakService.speak(this.expectedWord.name, this.expectedWord.type);
  }

  initForm() {
    this.formword = this.fb.group({
      word: ['', Validators.required],
    });

    this.formword.valueChanges.subscribe((data) => {
      this.wordEntry = data.word;
    });
  }

  startTimer() {
    clearInterval(this.timer);
  
    const storedEndTime = localStorage.getItem('endTime');
    
    if (storedEndTime) {
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
    this.validEntry = this.formword.get('word')?.value.toLowerCase() === this.expectedWord.name?.toLowerCase();
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
    if(this.currentPart) {
      this.fetching = true;
      this.submitted = true;
      this.gameManager.sendWord({
        word: this.wordEntry,
        playerID: this.playerId,
        competitionID: this.competition._id,
        gameRoundStep: this.gameRoundStep,
        gamePartID: this.currentPart._id,
      });
    }
  }
  closeModal() {
    this.modalService.dismissAll();
    this.gameManager.modalOpenSubject.next(false);
  }
}
