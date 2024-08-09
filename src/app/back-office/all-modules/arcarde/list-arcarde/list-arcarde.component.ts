import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ArcardeService } from '../services/arcarde.service';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'src/app/shared/entities/state.enum';
import { DataTableTranslateService } from 'src/app/services/data-table-translate.service';

@Component({
  selector: 'app-list-arcarde',
  templateUrl: './list-arcarde.component.html',
  styleUrls: ['./list-arcarde.component.css'],
})
export class ListArcardeComponent implements OnInit {
  arcardeData: Arcarde = new Arcarde();
  userID: string = '';
  gameState = State;
  arcades: Arcarde[] = [];
  listUnderCompetion: any[] = [];
  listLocationArcarde: any[] = [];
  waiting: boolean = false;

  constructor(
    private translate: TranslateService,
    public userServ: UserService,
    public arcadeServ: ArcardeService,
    private router: Router,
    private activedRouter: ActivatedRoute,
    public dataTableTranslateService: DataTableTranslateService,
    private translationService: TranslationService
  ) {
    this.arcadeServ.initFormControl();
    this.arcadeServ.initFormCreationArcarde();
  }

  ngOnInit(): void {
    this.getArcades();
  }

  getArcades() {
    this.arcadeServ.getAllArcades().then((response: any) => {
      this.arcades = response.data;
      response.data?.forEach((arcade) => {
        this.listUnderCompetion = [...arcade.competitionGames];
        if (arcade.competitionGames.length > 0) {
          arcade.competitionGames.forEach((compet) => {
            if (compet.localisation.toString()) {
              this.listLocationArcarde = [...compet.localisation];
            }
          });
        }
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  startArcarde(arcardeID: any) {
    this.arcadeServ.changeState({
      gameArcardeID: arcardeID,
      state: State.RUNNING,
    });
  }

  doSuscription() {
    this.arcadeServ.addUserToAccarde();
  }

  doUnsuscription() {
    this.arcadeServ.UnsuscribeUserToAcarde({
      playerID: this.userServ.getLocalStorageUser()._id,
      gameID: this.arcardeData._id,
    });
  }

  delete() {
    this.waiting = true;
    this.arcadeServ.deleteArcarde(this.arcardeData._id).then(() => {
      this.getArcades();
      this.waiting = false;
      $('#cancel-btn00').click();
    });
  }

  goToAcradeSuscription() {
    this.router.navigateByUrl('/arcarde/suscribe');
  }
}
