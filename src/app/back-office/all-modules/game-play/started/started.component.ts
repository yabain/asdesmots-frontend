import { Component, Injector, OnInit, StaticProvider } from "@angular/core";
import { GameManagerService } from "./../service/game-manager.service";
import { GameplayService } from "../service/gameplay.service";
import { SousCompetion } from "src/app/shared/entities/scompetion.model";
import { UserService } from "src/app/shared/services/user/user.service";
import { State } from "src/app/shared/entities/state.enum";
import { GamePartsService } from "../../arcarde/competition/gane-parts/list-parts/service/game-parts.service";
import { Socket } from "ngx-socket-io";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompetitionPlayingComponent } from "./competition-playing/competition-playing.component";

@Component({
  selector: "app-started",
  templateUrl: "./started.component.html",
  styleUrls: ["./started.component.css"],
})
export class StartedComponent implements OnInit {
  competitionChoose: SousCompetion = new SousCompetion();
  fetching: boolean = true;
  placeholders = Array.from({ length: 12 }); // Crée un tableau de 8 éléments
  gameState = State;
  competitions: SousCompetion[] = [];
  refreshable: boolean = true;

  constructor(
    public gameManager: GameManagerService,
    public gamePlay: GameplayService,
    public partService: GamePartsService,
    private userService: UserService,
    private socket: Socket,
    private modalService: NgbModal, 
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.gameManager.modalOpen$.subscribe((isOpen: boolean) => {
      this.refreshable = !isOpen;
      if(this.refreshable) {
        this.geCompetitions();
      }
    });
    // this.geCompetitions();
    this.socket.on("game-statechange", (data) => {
      this.geCompetitions();
    });
  }

  geCompetitions(): void {
    this.gamePlay
      .getPlayersRunningCompetitions()
      .then((response: any) => {
        this.setCompetitionsStates(response.data);
        this.fetching = false;
      })
      .catch((error) => {
        this.fetching = false;
      });
  }
  getIconClass(competition: SousCompetion): string {
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
  getActionStatus(competition: SousCompetion): string {
    if (competition.gameState === this.gameState.NO_START) {
      return "competition.run";
    } else if (competition.gameState === this.gameState.RUNNING) {
      return "competition.running";
    } else if (competition.gameState === this.gameState.WAITING_PLAYER) {
      return "competition.join";
    } else if (competition.gameState === this.gameState.END) {
      return "competition.stoped";
    } else {
      return "";
    }
  }
  setCompetitionsStates(competitions: SousCompetion[]): void {
    this.competitions = competitions.map((comp) => {
      if (comp.gameParts.find((p) => p.gameState === this.gameState.WAITING_PLAYER))
        comp.gameState = this.gameState.WAITING_PLAYER;
      return comp
    });
  }
  openModal(competition: SousCompetion) {
    this.gameManager.modalOpenSubject.next(true);
    this.joinGame(competition);
    const providers: StaticProvider[] = [
      { provide: 'competitionData', useValue: competition }
    ];

    const customInjector = Injector.create({
      providers: providers,
      parent: this.injector
    });

    const modalRef = this.modalService.open(CompetitionPlayingComponent, { injector: customInjector, centered: true, size: 'lg', });
    modalRef.result.then(
      () => { this.gameManager.modalOpenSubject.next(false); },
      () => { this.gameManager.modalOpenSubject.next(false); }
    );
  }
  waitingPlayersOrRunning(competition: SousCompetion) {
    return (
      competition.gameState === this.gameState.WAITING_PLAYER ||
      competition.gameState === this.gameState.RUNNING
    );
  }

  joinGame(competition: SousCompetion) {
    // if (competition.gameState === this.gameState.WAITING_PLAYER) {
    const userID = this.userService.getLocalStorageUser()._id;
    this.gameManager.joinGame({
      competitionID: competition._id,
      localisation: competition.localisation,
      playerID: userID,
    });
    // }
  }
}
