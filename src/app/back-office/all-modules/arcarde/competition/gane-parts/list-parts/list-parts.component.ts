import { Component, Input, OnInit } from "@angular/core";
import { GamePartsService } from "./service/game-parts.service";
import { GamePart } from "src/app/shared/entities/gamePart.model";
import { LevelService } from "src/app/shared/services/level/level.service";
import { Level } from "src/app/shared/entities/level";
import { SousCompetitionService } from "../../services/sous-competition.service";
import { SousCompetion } from "src/app/shared/entities/scompetion.model";
import { State } from "src/app/shared/entities/state.enum";
import { GameplayService } from "../../../../game-play/service/gameplay.service";
import { GameManagerService } from "../../../../game-play/service/game-manager.service";
import { ArcardeService } from "../../../services/arcarde.service";
import { Socket } from "ngx-socket-io";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-game-list-parts",
  templateUrl: "./list-parts.component.html",
  styleUrls: ["./list-parts.component.css"],
})
export class ListPartsComponent implements OnInit {
  @Input() competitionID: string;

  loading: boolean = true;
  parts = [];
  placeholders = Array.from({ length: 12 }); // Crée un tableau de 8 éléments

  competitionData: SousCompetion = new SousCompetion();

  gamePartData: GamePart = new GamePart();
  listLevel: Level[] = [];
  gameState = State;

  constructor(
    public gamePartSrv: GamePartsService,
    public level: LevelService,
    public gamePlay: GameplayService,
    public gameManager: GameManagerService,
    public partService: GamePartsService,
    private socket: Socket,
    public arcardeSrv: ArcardeService,
  ) {}

  ngOnInit(): void {
    this.partService.partListChanged$.subscribe(() => {
      this.getListParts();
    });
    this.getListParts();
    this.getLevel();
    this.socket.on("start-game-part", (data) => {
      this.parts.map((part) => {
        part.updatingState = false;
        // part.gameState = part._id == data.gameId ? State.WAITING_PLAYER : part.gameState;
        this.getListParts();
      });
    });
    this.socket.on('game-statechange', (data)=>{
      this.parts.map((part) => {
        console.log(part.name,part.gameState);
      });
      if(this.competitionID == data.competitionID)
        this.getListParts();
    });
    this.socket.on("start-game-part-error", (error) => {
      this.parts.map((part) => {
        part.updatingState = false;
      });
    });
  }

  getListParts() {
    this.loading = true;
    this.gamePartSrv
      .getListGamePart(this.competitionID)
      .then((response: any) => {
        this.parts = response.data;
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
      });
  }

  getLevel() {
    if (this.level.levelList.length === 0) {
      this.level.getAllLevels();
    }
  }
  getIconClass(competition: any): string {
    if (competition.gameState === this.gameState.NO_START) {
      return "fa fa-play";
    } else if (competition.gameState === this.gameState.RUNNING) {
      return "fas fa-clock";
    } else if (competition.gameState === this.gameState.WAITING_PLAYER) {
      return "fas fa-user-plus";
    } else if (competition.gameState === this.gameState.END) {
      return "fas fa-stop";
    } else {
      return ""; // Classe par défaut si nécessaire
    }
  }
  startGame(part: any) {
    part.updatingState = true;
    this.gameManager.startGame({
      competitionID: this.competitionID,
      gamePartID: part._id,
    });
  }
}
