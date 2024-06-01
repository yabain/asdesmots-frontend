import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { ArcardeService } from '../../arcarde/services/arcarde.service';
import { SousCompetitionService } from '../services/sous-competition.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.css']
})
export class CreateCompetitionComponent implements OnInit {
  sousCompetitionSelctedData: SousCompetion = new SousCompetion();
  id_Arcarde : string = ''; //id arcade of the new register competion;
  formIdArcarde!: FormGroup;
  loading: boolean = false;
  constructor(public sousCompetion: SousCompetitionService,
              private fb: FormBuilder,
              private translate: TranslateService,
              private toastr: ToastrService,
              private translation: TranslationService,
              private route: Router,
              public level: LevelService,
              private location: Location,
              public arcardeSrv: ArcardeService
              ) {
      this.translate.use(this.translation.getCurrentLanguage());
      this.loadListOfArcarde();
      this.sousCompetion.initFormControl();
      this.sousCompetion.initFormUpdate();
      this.initArcardeFormID();
      this.getLevel();
   }

  ngOnInit(): void {

  }

  initArcardeFormID(){
     this.formIdArcarde = this.fb.group({
        idArcarde: ['', Validators.required]
    });

    this.formIdArcarde.valueChanges.subscribe((idChoossed)=>{
        this.id_Arcarde = idChoossed;
        this.sousCompetion.buildListParentCompetition(idChoossed.idArcarde);
    });
  }

  // doCreationCompetion(){
  //   this.loading = true;
  //     this.sousCompetion.createCompetition(this.sousCompetion.newUnderCompetionParam, this.id_Arcarde);
  //     this.arcardeSrv.loadArcade();
  //     this.sousCompetion.loadListUnderCompetition();
  //     this.toastr.success('Competition Created', 'Success', { timeOut: 7000 });
  //     this.location.back();
  //     this.sousCompetion.loadListUnderCompetition();
  //     this.loading = false;
  // }

  doCreationCompetion() {
    this.loading = true; // Activer le loader

    // Obtenez les données du formulaire
    const competionData = this.sousCompetion.form.value;

    // Effectuez l'appel au service
    this.sousCompetion.createCompetition(competionData, this.id_Arcarde).subscribe(
      (resp) => {
        // Succès de la création de la compétition
        this.arcardeSrv.loadArcade();
        this.sousCompetion.loadListUnderCompetition();
        this.toastr.success('Competition Created', 'Success', { timeOut: 7000 });

        // Désactivez le loader une fois que le traitement est terminé
        this.loading = false;

         // Naviguer vers la page de la liste des compétitions
        this.route.navigateByUrl('/undercompetition/competition/list');
      },
      (error: any) => {
        // Gestion des erreurs
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        } else if (error.status == 404) {
          this.toastr.error("Game Arcarde not found", 'Error', { timeOut: 10000 });
        } else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }

        // Désactivez le loader en cas d'erreur
        this.loading = false;
      }
    );
    // this.location.back();
  }

  resetFormCreation(){
    this.sousCompetion.form.reset();
    this.sousCompetion.creationDone = false;
    this.route.navigateByUrl('/undercompetition/competition/list');
  }

  async loadListOfArcarde(){
    if(this.arcardeSrv.listArcardeUser.length == 0){
        this.arcardeSrv.loadArcade();
    }
    this.sousCompetion.loadListUnderCompetition();
  }

  getLevel(){
      if(this.level.levelList.length === 0){
          this.level.getAllLevels();
      }
  }

  backClicked(){
    this.resetFormCreation();
    // this.location.back();
  }
}
