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
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GameManagerService {

  modalOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  modalOpen$: Observable<boolean> = this.modalOpenSubject.asObservable();
  
  playerLife: [];
  listOfPlayer: User[] = [];
  currentUserData: any;
  gameState = State;
  listArcardeIsRunnig: Arcarde[] = [];
  playerSouscribed: number;

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
      else if (error.response?.message == "game already playing")
        this.translate
          .get("competition.subscribeErrorAlreadyPlaying")
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
    this.socket.on('game-play-error', () => {
      this.translate
        .get("errorResponse.unexpectedError")
        .subscribe((res: string) => {
          this.toastr.error(res, "Error");
        });
    })
  }
  joinGame(requestBody: {
    competitionID: string;
    playerID: string;
    localisation: string;
  }) {
    this.socket.emit("join-game", requestBody);
  }

  leaveGame(requestBody: {
    competitionID: string;
    playerID: string;
  }) {
    this.socket.emit("leave-game", requestBody);
  }

  changeState(requestBody: { competitionID: string; gamePartID: string, gameState: string }) {
    this.socket.emit("change-game-part-state", requestBody);
  }

  sendWord(requestBody: {
    competitionID: string;
    playerID: string;
    word: string;
    gameRoundStep: number; 
    gamePartID: string
  }) {
    this.socket.emit("game-play", requestBody);
  }
}
