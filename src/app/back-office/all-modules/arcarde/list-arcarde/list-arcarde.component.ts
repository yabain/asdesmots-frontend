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
  waiting: boolean = false;

  // @ViewChild('process_running_gameStarted') process_running_gameStarted: TemplateRef<any>;

  // @ViewChild('process_running_gameStarted') process_running_down: TemplateRef<any>;
  // idArcard: string = '';

  constructor(
    public arcadeServ: ArcardeService,
    private translate: TranslateService,
    public userServ: UserService,
    private router: Router,
    private activedRouter: ActivatedRoute,
    public dataTableTranslateService: DataTableTranslateService,
    private translationService: TranslationService
  ) {
    this.arcadeServ.initFormControl();
    this.arcadeServ.initFormCreationArcarde();
    this.translate.use(this.translationService.getCurrentLanguage());
    // this.getId();
  }

  ngOnInit(): void {
    this.loadArcardeCurrentUser();
    //  this.loadAllArcarde();
    setTimeout(() => {
      this.loadAllUser();
    }, 2500);
  }

  loadArcardeCurrentUser() {
    if (this.arcadeServ.listArcardeUser.length == 0) {
      this.arcadeServ.loadArcade(); //user arcarde
    }
  }

  loadAllArcarde() {
    if (this.arcadeServ.listAllArcarde.length == 0) {
      this.arcadeServ.loadAllArcarde();
    }
  }

  async loadAllUser() {
    if (this.userServ.listUsers.length == 0) {
      this.userServ.getAllUsers();
      this.userID = JSON.parse(localStorage.getItem('user-data'))._id;
    }
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

  createArcarde() {
    if (this.arcadeServ.formControlCreateArcarde.valid) {
      this.arcadeServ.createNewArcarde();
    }
  }

  delete() {
    this.waiting = true;
    this.arcadeServ.deleteArcarde(this.arcardeData._id).then(() => {
      this.waiting = false;
      // this.refreshList();
      $('#cancel-btn00').click();
    });
    this;
    this.arcadeServ.deleteArcarde(this.arcardeData._id);
  }

  resetFormCreation() {
    this.arcadeServ.formControlCreateArcarde.reset();
    this.arcadeServ.isCreationDone = false;
  }

  resetFormSuscribtion() {
    this.arcadeServ.formControlSuscription.reset();
    this.arcadeServ.suscriptionDone = false;
  }

  refresh() {
    this.arcadeServ.loadArcade();
  }

  goToListUser(id: string) {
    console.log('test id :', id);
    // await this.arcadeServ.getListUsersOfArcardes(id);
    this.router.navigateByUrl('/arcarde/list-user/' + id);
  }

  goToAcradeSuscription() {
    this.router.navigateByUrl('/arcarde/suscribe');
  }

  //  getId(){
  //   this.idArcard = this.activedRouter.snapshot.params['id'];
  //   console.log("id arcarde: " + this.idArcard);
  //   this.arcadeServ.getListUsersOfArcardes(this.idArcard);
  // }
}
