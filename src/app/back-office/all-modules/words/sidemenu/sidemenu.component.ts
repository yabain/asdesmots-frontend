import { AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { Level } from 'src/app/shared/entities/level';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { ProgressIndeterminateModule } from "../../../../shared/elements/progress-indeterminate/progress-indeterminate.module";
@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    standalone: true,
    styleUrls: ['./sidemenu.component.css'],
    imports: [CommonModule, 
      DragDropModule, 
      TranslateModule, 
      ProgressIndeterminateModule,
      ReactiveFormsModule
    ]
})
export class SidemenuComponent implements OnInit{


  totalWords: number;
  totalEnWords: number;
  totalFrWords: number;
  waitingResponse = false;
  levels: any;
  levelList?: any = '';
  levelData?: any = '';
  newLevelId: string;
  levelOfList: any[] ;
  item: any;
  public levelControler: any
  waiting: boolean = false;
  minDescLength: number = 4;

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
  modalVisible: boolean = true;
  deletedLevel: any;
  filteredLevelList: Level[];
  selectedLevelId: string;
  oldLevelId: string;
  selectedLevel: Level;
  submitted: boolean = false;

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
  ) {}

  ngOnInit() {
    this.getLevelList();
    this.translate.use(this.translationService.getCurrentLanguage());
    this.levelForm = this.formLog.group({
      '_id': [this.levelData._id
      ],
      'name': [this.levelData.name, Validators.required
      ],
      'description': [this.levelData.description, Validators.compose([
        Validators.required,
        Validators.minLength(this.minDescLength)])
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

  filterLevels(): void {
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
    this.submitted = true;
    if (this.levelForm.invalid) {
      return;
    }
    this.waitingResponse = true
    const data = {
      ...this.levelForm.value, 
    }
    this.levelService.createLevel(data)
      .then(async () => {
        this.submitted = false;
        this.waitingResponse = false;
        this.levelList.push(data)
        await this.refreshList();
        $('#cancel-btn1').click();
      })
      .catch((error) => {
        this.submitted = false;
        this.waitingResponse = false;
      });
  }

  onLevelChange(event: any) {
    const selectedLevelId = event.target.value;
     this.selectedLevel = this.filteredLevelList.find(level => level._id === selectedLevelId);
    if (this.selectedLevel) {
      console.log('Objet du niveau sélectionné :', this.selectedLevel);
    } else {
      console.log('Aucun niveau sélectionné');
    }
  }

  TransfertWords(){
    // this.newLevelId = this.deleteLevelForm.value.groupHeriterId;
    this.newLevelId = this.selectedLevel._id;
    console.log("level ou iront les mots:", this.newLevelId);
    this.deleteLevelForm.value.levelDataId = this.levelData._id;
    console.log('oldId level: ', this.deleteLevelForm.value.levelDataId);
    console.log(this.deleteLevelForm.value)
    if (this.deleteLevelForm.invalid) {
      return;
    }
    this.waitingResponse = true;
    console.log('deleteLevelForm: ', this.deleteLevelForm.value);
    this.levelService.deleteLevel(this.deleteLevelForm.value.levelDataId, this.newLevelId)
      .then(async () => {
        // this.waitingResponse = false;
        this.modalVisible = true;
        // this.submitted = false;
        await this.refreshList();
        $('#cancel-btn').click();
      })
      .catch((error) => {
        this.submitted = false;
        this.waitingResponse = false;
      });
  }

  deleteLevel(){
    this.deleteLevelForm.value.levelDataId = this.levelData._id;
    console.log('oldId level: ', this.deleteLevelForm.value.levelDataId);
    // console.log(this.deleteLevelForm.value)
    if (this.deleteLevelForm.invalid) {
      return;
    }
    this.waitingResponse = true;
    console.log('deleteLevelForm: ', this.deleteLevelForm.value);
    this.levelService.deleteLevelId(this.deleteLevelForm.value.levelDataId)
      .then(async () => {
        // this.waitingResponse = false;
        await this.refreshList();
        this.modalVisible = true;
        // this.submitted = false;
        $('#cancel-btn').click();
      })
      .catch((error) => {
        this.submitted = false;
        this.waitingResponse = false;
      });
  }

//   transferWords(): void {
//     //recupérer id du niveau vers lequel transférer les mots
//    this.newLevelId = this.transferWordsForm.value.groupHeriterId;
//    console.log("id du niveau transférer mots: ", this.newLevelId);
//    //recupérer id du niveau à supprimer ie ancien niveau
//    this.oldLevelId = this.levelData._id;
//    console.log("id du niveau à supprimer: ", this.oldLevelId);
//    //appel méthode transfertWords() de level.service
//    this.waitingResponse = true;
//    this.levelService.transferWords(this.oldLevelId, this.newLevelId)
//    .then(() => {
//      console.log("heyyy ronice");
//      return this.levelService.deleteLevelId(this.oldLevelId);
//    })
//    .then(() => {
//      this.modalVisible = false;
//      this.submitted = false;
//      this.waitingResponse = false;
//      this.refreshList();
//      $('#cancel-btn').click();
//    })
//    .catch((error) => {
//      this.submitted = false;
//      this.waitingResponse = false;
//      console.error(error);
//    });

//    this.levelService.transferWords(this.oldLevelId, this.newLevelId).subscribe(
//      (response) => {
//         this.modalVisible = false;
//        console.log('Mots transférés avec succès');
//        // Effectuer d'autres actions après le transfert des mots
//      },
//      (error) => {
//        console.error('Erreur lors du transfert des mots', error);
//        // Gérer l'erreur si nécessaire
//      }
//    );

//    this.levelService.deleteLevelId(this.oldLevelId).then(() => {
//      this.modalVisible = false;
//      this.submitted = false;
//      this.waitingResponse = false;
//      this.refreshList();
//      $('#cancel-btn').click();
//    })
//    .catch((error) => {
//      this.submitted = false;
//      this.waitingResponse = false;
//    });

//  }

  navigate(name: any) {
    this.name = name;
    this.commonService.nextmessage(name);
  }

  async refreshList() {
    this.waitingResponse = true;
    this.levelService.getAllLevels(true)
      .then(async (result) => {
        this.levelList = result.levels;
        this.waitingResponse = false;
        const data = this.sortabledata(this.levelList)
        await this.levelService.sortLevels(data);
      })
      .catch((error) => {
        console.error('Erreur: ', error.message);
        this.toastr.error(error.message, 'Error', { timeOut: 10000 });
        this.waitingResponse = false;
      });
  }

  getLevelList() {
    if (JSON.parse(sessionStorage.getItem('levels-list'))) {
      const data = JSON.parse(sessionStorage.getItem('levels-list'));
      this.levelList = data.levels;
      this.totalEnWords = data.enWordsLength;
      this.totalFrWords = data.frWordsLength;
      this.totalWords = data.enWordsLength + data.frWordsLength;
      console.log("liste niveau " + this.levelList);
    }
    else {
      this.waitingResponse = true;
      this.levelService.getAllLevels(true)

        .then((result) => {
          console.log("le resultat : ", result)
          this.waitingResponse = false;
          const data = result
          this.levelList = data.levels;
          this.totalEnWords = data.enWordsLength;
          this.totalFrWords = data.frWordsLength;
          this.totalWords = data.enWordsLength + data.frWordsLength;
          console.log('levellist :', this.levelList)
          // this.calculateWordSums();
        })
        .catch((error) => {
          console.error('Erreur: ', error.message);
          this.toastr.error(error.message, 'Error', { timeOut: 10000 });
          this.waitingResponse = false;
        });
    }
  }

  get f() {
    return this.levelForm.controls;
  }
  async drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.levelList, event.previousIndex, event.currentIndex);
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    this.resortList();
    const data = this.sortabledata(this.levelList)
    await this.levelService.sortLevels(data);
  }
  resortList(){
    this.levelList.forEach((elem: any, index) => {
      elem.level = index + 1;
    })
  }
  sortabledata(data: any[]): {id: string, level: number }[]{
    return data.map((elem: any) => {
      return {
        id: elem._id,
        level: elem.level
      }
    })
  }
  updateLevel(){
    this.submitted = true;
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
        this.submitted = false;
        this.refreshList();
        $('#close-modal').click();
      })
      .catch((error) => {
        this.waiting = false;
        this.submitted = false;
      });
  }
}