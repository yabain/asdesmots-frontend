import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { ToastrService } from "ngx-toastr";
import { SousCompetion } from "src/app/shared/entities/scompetion.model";
import { User } from "src/app/shared/entities/user";
import { UserService } from "src/app/shared/services/user/user.service";
import { ArcardeService } from "../../arcarde/services/arcarde.service";
import { State } from "src/app/shared/entities/state.enum";
import { Arcarde } from "src/app/shared/entities/arcarde.model";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class GameManagerService {
  playerLife: [];
  itsToThisUserToPlay: boolean = false;
  listOfPlayer: User[] = [];
  currentUserData: any;
  gameState = State;
  listArcardeIsRunnig: Arcarde[] = [];
  playerSouscribed: number;

  gameDetails: {
    gameRound: any;
    gameWord: string;
    player: User;
  };

  competitionLaunched: SousCompetion = new SousCompetion();

  constructor(
    private toastr: ToastrService,
    private userData: UserService,
    private socket: Socket,
    public arcardServ: ArcardeService,
    private translate: TranslateService
  ) {
    this.currentUserData = this.userData.getLocalStorageUser();
    this.socket.on("join-game-error", (error) => {
      console.log("join-game-error", error);
      if (error.response?.message == "Unable to subscribe in this location")
        this.translate.get("arcade.player").subscribe((player: string) => {
          this.translate
            .get("errorResponse.entityNotFound", {
              entity: player,
            })
            .subscribe((res: string) => {
              this.toastr.error(res, "Error");
            });
        });
      else if (error.response?.message == "Competition not found")
        this.translate
          .get("competition.competition")
          .subscribe((competition: string) => {
            this.translate
              .get("errorResponse.entityNotFound", {
                entity: competition,
              })
              .subscribe((res: string) => {
                this.toastr.error(res, "Error");
              });
          });  
      else if (error.response?.message == "No game part found in the competition")
        this.translate
          .get("competition.noPartFound")
          .subscribe((res: string) => {
            this.toastr.error(res, "Error");
          })
      else
        this.translate
          .get("errorResponse.unexpectedError")
          .subscribe((res: string) => {
            this.toastr.error(res, "Error");
          });
    });
  }

  setGamerLife() {
    // this.playerLife.length = this.competitionLaunched.maxPlayerLife;
    // this.playerLife.map((life)=> life++)
  }

  joinGame(requestBody: {
    competitionID: string;
    playerID: string;
    localisation: string;
  }) {
    this.socket.emit("join-game", requestBody);
    this.initSocketListener();
    this.setGamerLife();
  }

  startGame(requestBody: { competitionID: string; gamePartID: string }) {
    this.socket.emit("start-game-part", requestBody);
  }

  initSocketListener() {
    this.selectWordAndPlayerListener();
  }

  selectWordAndPlayerListener() {
    this.itsToThisUserToPlay = false;
    this.socket.on(
      "game-play",
      (data: { gameRound: any; gameWord: string; player: User }) => {
        console.log("response game-play", data);
        this.gameDetails = data;
        if (this.userData.getLocalStorageUser()?._id === data.player._id) {
          this.itsToThisUserToPlay = true;
        }
      }
    );
  }

  sendWord(requestBody: {
    competitionID?: string;
    playerID: string;
    word: string;
  }) {
    requestBody.competitionID = this.competitionLaunched._id;
    this.socket.emit("game-play", requestBody);
    this.gamePlayerLifeGame();
    //this.selectWordAndPlayerListener();
  }

  gamePlayerLifeGame() {
    this.socket.on(
      "game-player-lifegame",
      (response: { player: User; lifeGame: number }) => {
        if (response.player._id === this.currentUserData.field_id) {
          this.onBardResponse();
        }
      }
    );
  }

  onBardResponse() {
    this.listOfPlayer.pop();
  }

  // loadArcardeRunnig(): void{
  //   this.arcardServ.listArcardeUser.forEach((arcarde)=> {
  //     if(arcarde.gameState == this.gameState.RUNNING) {
  //       this.listArcardeIsRunnig.push(arcarde);
  //     }
  //   })
  //   this.listArcardeIsRunnig.forEach((runningAcarde) => {
  //     if(runningAcarde.playerGameRegistrations.length != 0) {
  //       this.playerSouscribed = runningAcarde.playerGameRegistrations.length;
  //     }
  //   })
  //   console.log("nombre jouers inscris: ", this.playerSouscribed);
  //   console.log("liste des arcardes à running:", this.listArcardeIsRunnig);
  // }
}
