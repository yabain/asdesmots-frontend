import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { io } from "socket.io-client";
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { User } from 'src/app/shared/entities/user';
import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  playerLife: [];
  itsToThisUserToPlay: boolean = false;
  listOfPlayer : User[] = [];
  currentUserData: any;
  
  TimeOutMessage = 'Temps ecoulé !!';
  showTimeOutMEssage : boolean = false;

  restTime: number = 0;
  interval: any;

  gameDetails : {
      gameRound: any,
      gameWord: string,
      player: User
  };

  competitionLaunched: SousCompetion = new SousCompetion();
  socket: any;
  formword: FormGroup;
  wordEntry: string = '';

  constructor(
      private toastr: ToastrService,
      private userData: UserService,
      private fb: FormBuilder,

  ) { 
      this.loadUserData();
      this.initForm();
  }
  
  initConnection(){
    this.socket = io('https://asdesmots-api.yaba-in.com/');

    this.socket.on("connect", (err: any) => {
      console.log("Connexion réussie !");
    });

    this.socket.on('error', (err: any)=>{
        console.log('ws error', err);
    })
  }

  initTimeToPlay(){
    this.restTime = this.competitionLaunched.maxTimeToPlay;
  }

  setGamerLife(){
    this.playerLife.length = this.competitionLaunched.maxPlayerLife;
    this.playerLife.map((life)=> life++);
  }

  loadUserData(){
      this.currentUserData = JSON.parse(localStorage.getItem('user-data'));
  }

  joinGame(requestBody: {competitionID: string, playerID: string, localisation: string}){
    this.socket.emit('join-game', requestBody);
    this.initSocketListener();
    this.setGamerLife();
  }
  
  initSocketListener(){
    this.joinGameResponseListener();
    this.newPLayerHasJoinedGame();
    this.gameStateChange();
    this.selectWordAndPlayerListener();
  }

  initForm(){

    this.formword = this.fb.group({
      word: ['', Validators.required],
    });

    this.formword.valueChanges.subscribe((data)=>{
        this.wordEntry = data.word;
    });

  }

  joinGameResponseListener(){
    this.socket.on('join-game', (data: any)=>{
        console.log('response join game', data);
    });
  }

  newPLayerHasJoinedGame(){
    this.socket.on('new-player', (list:  any)=>{
          this.listOfPlayer = [];
          this.listOfPlayer = Array.from(list.data);
    });
  }

  gameStateChange(){
    this.socket.on('game-statechange', (param: any)=>{
        this.competitionLaunched.gameState = param.gameState;
    });
  }

  selectWordAndPlayerListener(){
    this.itsToThisUserToPlay = false;

      this.socket.on('game-play', 
      (data: {
          gameRound: any,
          gameWord: string,
          player: User
        }
       )=>{

              console.log('response game-play', data);

              this.gameDetails = data;
              
              if(this.userData.getLocalStorageUser()._id === data.player._id){
                  this.itsToThisUserToPlay = true;
                  this.startTimer();
              }

          }
      );
  }

  sendWord(requestBody: {competitionID?: string, playerID: string, word?: string}){
    
    requestBody.competitionID = this.competitionLaunched._id;
    requestBody.word = this.wordEntry;

    this.socket.emit('game-play', requestBody);
    this.gamePlayerLifeGame();
    //this.selectWordAndPlayerListener();
  }

  gamePlayerLifeGame(){

      this.socket.on('game-player-lifegame', (response: {player: User, lifeGame: number})=>{
              if(response.player._id === this.currentUserData._id){
                    this.BadResponse()
              }
      });

  }

  BadResponse(){
    this.listOfPlayer.pop();
  }


  //Timer Manager

  startTimer(){
    this.initTimeToPlay();
    this.showTimeOutMEssage = false;

    this.interval = setInterval(() => {
      if(this.restTime > 0) {
        this.restTime--;
      } else {
                this.sendWord({
                    competitionID: this.competitionLaunched._id,
                    playerID: this.userData.getLocalStorageUser()._id,
                    word: this.wordEntry
                });
            this.showTimeOutMessage();
      }
      
    }, 1000);

  }

  showTimeOutMessage(){
    this.showTimeOutMEssage = true;

    setTimeout(()=>{
        this.showTimeOutMEssage = false;
    }, 3500);
  }

}
