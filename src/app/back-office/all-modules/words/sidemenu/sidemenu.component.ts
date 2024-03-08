import { Component, OnInit, SimpleChanges } from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { Level } from 'src/app/shared/entities/level';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Word } from 'src/app/shared/entities/word';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {


  totalWords: number;
  totalEnWords: number;
  totalFrWords: number;
  waitingResponse = false;
  submitted = true;
  levels: any;
  levelList?: any = '';
  levelData?: any = '';
  newLevelId: string;
  levelOfList: any[] ;
  public levelControler: any
  waiting: boolean = false;

  name: any
  splitVal;
  base;
  page;
  url;
  curentLevel;
  levelForm: FormGroup;
  deleteLevelForm: FormGroup;
  transferWordsForm: FormGroup;
  wordToSpeak: string = '';
  modalVisible = true;
  deletedLevel: any;
  // selectedLevelId: string;
  filteredLevelList: Level[];
  selectedLevelId: string;
  oldLevelId: string;



  constructor(
    private router: Router,
    location: Location,
    public commonService: CommonServiceService,
    private authService: AuthService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private translationService: TranslationService,
    private levelService: LevelService,
    private formLog: FormBuilder,
    // private word: Word
  ) {

    // router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
    //     if (event instanceof NavigationStart) {
    //       this.splitVal = event.url.split('/');
    //       this.base = this.splitVal[1];
    //       this.page = this.splitVal[2];
    //       this.curentLevel = this.splitVal[3];
    //       console.log("splitVal: ", this.splitVal)
    //     }
    //   }
    // });
    // this.url = location.path();
    // if (this.url) {
    //   this.splitVal = this.url.split('/');
    //   this.base = this.splitVal[1];
    //   this.page = this.splitVal[2];
    //   if (this.splitVal[3] !== undefined) {
    //     this.curentLevel = this.splitVal[3];
    //     console.log("splitUrl1: ", this.url)
    //   } else {
    //     this.curentLevel = 'sdfsdfsd';
    //   }
    // }

    this.getLevelList();
    this.calculateWordSums();
    // this.filterLevels();

  }

  ngOnInit() {
    this.translate.use(this.translationService.getLanguage());
    this.getLevelList();
    this.levelForm = this.formLog.group({
      '_id': [this.levelData._id
      ],
      'name': [this.levelData.name, Validators.required
      ],
      'description': [this.levelData.description, Validators.compose([
        Validators.required,
        Validators.minLength(4)])
      ]
    });

    this.transferWordsForm = this.formLog.group({
      'levelDataId': [''],
      'groupHeriterId': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])
      ]
    });

    this.deleteLevelForm = this.formLog.group({
      'levelDataId': ['']
    })
  }


  calculateWordSums() {
    this.totalWords = 0;
    this.totalEnWords = 0;
    this.totalFrWords = 0;

    for (const level of this.levelList) {
      if (level.words && level.words.length > 0) {
        this.totalWords += level.words.length;

        for (const word of level.words) {
          console.log("list of word: " + level.words);
          if (word.type === 'en') {
            this.totalEnWords++;
          } else if (word.type === 'fr') {
            this.totalFrWords++;
          }
        }
      }
    }
  }

  // deleteLevelOfListOfTransfer(level: any) {
  //   // Code pour supprimer le niveau de la liste
  //   this.levelData = level;
  //   this.deleteLevel = {...level}
  //   const index = this.levelList.indexOf(level);
  //   if (index !== -1) {
  //     this.levelList.splice(index, 1);
  //   }
  // }

  // restoreLevel() {
  //   if (this.deletedLevel) {
  //     const index = this.levelList.indexOf(this.deletedLevel);
  //     if (index > -1) {
  //       this.levelList.splice(index, 0, this.deletedLevel); // Réinsérer le niveau supprimé dans la liste à son emplacement d'origine
  //       this.deletedLevel = null; // Réinitialiser la variable deletedLevel
  //     }
  //   }
  // }

  // deleteLevelOfListOfTransfer(level: any) {

  //   this.levelData = level;
  //   this.deletedLevel = { ...level }; // Crée une copie du niveau à supprimer

  //   // Ajouter un écouteur d'événement de clic sur le document
  //   document.addEventListener('click', this.handleClickOutsideDeleteButton);
  // }

  // handleClickOutsideDeleteButton = (event: MouseEvent) => {
  //   const target = event.target as HTMLElement;

  //   // Vérifier si l'élément cliqué n'est pas le bouton "Supprimer"
  //   if (!target.classList.contains('btn-danger')) {
  //     this.restoreLevel(); // Restaurer le niveau supprimé
  //     document.removeEventListener('click', this.handleClickOutsideDeleteButton); // Supprimer l'écouteur d'événement
  //   }
  // };

  // getFilteredLevels(): Level[] {
  //   return this.levelList.filter(level => level._id !== this.selectedLevelId);
  // }

  filterLevels(): void {
    console.log("fygugugu");
    this.filteredLevelList = this.levelList.filter(level => level._id !== this.levelData._id);
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes.wordData && this.levelForm) {
      this.levelData = changes.levelData.currentValue;
      this.levelForm.controls._id.setValue(this.levelData._id);
      this.levelForm.controls.name.setValue(this.levelData.name);
      this.levelForm.controls.description.setValue(this.levelData.description);
    }
  }

  updateLevelForm(level) {
    this.levelForm.controls._id.setValue(level._id);
    this.levelForm.controls.name.setValue(level.name);
    this.levelForm.controls.description.setValue(level.description);
  }

  resetForm() {
    this.levelForm.reset();
  }

  navigateToLevel(levelId) {
    this.router.navigateByUrl(`words/words-list/${levelId}`);
  }

  addLevel() {
    if (this.levelForm.invalid) {
      return;
    }
    this.waitingResponse = true
    console.log('addLevel: ', this.levelForm.value);
    this.levelService.createLevel(this.levelForm.value)
      .then(() => {
        this.submitted = false;
        this.waitingResponse = false;
        this.refreshList();
        $('#cancel-btn1').click();
      })
      .catch((error) => {
        this.submitted = false;
        this.waitingResponse = false;
      });
  }

  deleteLevel(){

    this.newLevelId = this.deleteLevelForm.value.groupHeriterId;
    this.deleteLevelForm.value.levelDataId = this.levelData._id;

    console.log(this.deleteLevelForm.value)
    if (this.deleteLevelForm.invalid) {
      return;
    }

    this.waitingResponse = true
    console.log('deleteLevelForm: ', this.deleteLevelForm.value);
    this.levelService.deleteLevel(this.deleteLevelForm.value)
      .then(() => {
        this.submitted = false;
        this.waitingResponse = false;
        this.refreshList();
        $('#cancel-btn').click();
      })
      .catch((error) => {
        this.submitted = false;
        this.waitingResponse = false;
      });
  }

  // deleteLevel(): void {
  //   console.log("bonjour");
  //   this.deleteLevelForm.value.levelDataId = this.levelData._id;
  //   console.log(this.deleteLevelForm.value.levelDataId);
  //   this.levelService.deleteLevelById(this.deleteLevelForm.value.levelDataId);
  //   this.modalVisible = false;
  //   this.transferWordsForm.reset();
  //   this.deleteLevelForm.reset();
  // }

  transferWords(): void {
    //recupérer id du niveau vers lequel transférer les mots
   this.newLevelId = this.transferWordsForm.value.groupHeriterId;
   console.log("id du niveau transférer mots: ", this.newLevelId);
   //recupérer id du niveau à supprimer ie ancien niveau
   this.oldLevelId = this.levelData._id;
   console.log("id du niveau à supprimer: ", this.oldLevelId);
   //appel méthode transfertWords() de level.service
   this.waitingResponse = true;
   this.levelService.transferWords(this.oldLevelId, this.newLevelId)
   .then(() => {
     this.submitted = false;
     this.waitingResponse = false;
     this.refreshList();
     $('#cancel-btn').click();
   })
   .catch((error) => {
     this.submitted = false;
     this.waitingResponse = false;
   });

   // this.levelService.transferWords(this.oldLevelId, this.newLevelId).subscribe(
   //   (response) => {
   //     console.log('Mots transférés avec succès');
   //     // Effectuer d'autres actions après le transfert des mots
   //   },
   //   (error) => {
   //     console.error('Erreur lors du transfert des mots', error);
   //     // Gérer l'erreur si nécessaire
   //   }
   // );

  //  this.levelService.deleteLevelId(this.oldLevelId).then(() => {
  //    this.submitted = false;
  //    this.waitingResponse = false;
  //    this.refreshList();
  //    $('#cancel-btn').click();
  //  })
  //  .catch((error) => {
  //    this.submitted = false;
  //    this.waitingResponse = false;
  //  });

 }

  navigate(name: any) {
    this.name = name;
    this.commonService.nextmessage(name);
  }

  refreshList() {
    this.waitingResponse = true;
    this.levelService.getAllLevels(true)
      .then((result) => {
        this.levelList = result;
        this.waitingResponse = false;
      })
      .catch((error) => {
        console.error('Erreur: ', error.message);
        this.toastr.error(error.message, 'Error', { timeOut: 10000 });
        this.waitingResponse = false;
      });
  }

  getLevelList() {

    console.log("roro");
    if (JSON.parse(localStorage.getItem('levels-list'))) {
      this.levelList = JSON.parse(localStorage.getItem('levels-list'));
      console.log("liste niveau " + this.levelList);
    }
    else {
      this.waitingResponse = true;
      this.levelService.getAllLevels()
        .then((result) => {
          this.waitingResponse = false;
          this.levelList = result;
        })
        .catch((error) => {
          console.error('Erreur: ', error.message);
          this.toastr.error(error.message, 'Error', { timeOut: 10000 });
          this.waitingResponse = false;
        });;
    }

  }

  get f() {
    return this.levelForm.controls;
  }

  updateLevel(){
    if (this.levelForm.invalid) {
      return;
    }
    let updateData = {
      "name": this.levelForm.value.name,
      "description": this.levelForm.value.description,
      "_id": this.levelData._id
    }
    console.log("updateData: ", updateData);
    this.waiting = true;
    console.log("General datas: ", this.levelForm.value);
    this.levelService.updateLevel(this.levelForm.value._id, this.levelForm.value)
      .then((result) => {
        this.waiting = false;
        this.refreshList();
        $('#close-modal').click();
      })
      .catch((error) => {
        this.waiting = false;
      });
  }
}
