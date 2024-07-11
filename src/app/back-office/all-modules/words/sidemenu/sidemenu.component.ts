import { Component, OnInit, SimpleChanges } from '@angular/core';
import {
  Router,
} from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { Level } from 'src/app/shared/entities/level';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgressIndeterminateModule } from "../../../../shared/elements/progress-indeterminate/progress-indeterminate.module";
import { WordDataService } from '../word-data.service';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
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
  currentLevel: Level;
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
  displayedColumns: string[] = ['level', 'name', 'words', 'actions'];

  constructor(
    public commonService: CommonServiceService,
    private translate: TranslateService,
    private translationService: TranslationService,
    private levelService: LevelService,
    private formLog: FormBuilder,
    private wordDataService: WordDataService
  ) {}

  ngOnInit() {
    this.wordDataService.levels$.subscribe(async (levels: any) => {
      const data = levels
      this.levelList = data.levels;
      this.totalEnWords = data.enWordsLength;
      this.totalFrWords = data.frWordsLength;
      this.totalWords = data.enWordsLength + data.frWordsLength;
      if(this.levelList) {
        const levs = this.sortabledata(data.levels)
        this.levelService.sortLevels(levs);
      }
    });
    this.wordDataService.levelFetching$.subscribe((value: any) => {
      this.waitingResponse = value;
    })
    this.wordDataService.currentLevel$.subscribe((level: any) => {
      this.currentLevel = level;
    })
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

  filterLevels(level): void {
    this.levelData = level;
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

  navigateToLevel(level) {
    this.wordDataService.currentLevelSubject.next(level)
    this.wordDataService.listWordBylevel(level._id, false)
  }

  addLevel() {
    this.submitted = true;
    this.waiting = true;
    if (this.levelForm.invalid) {
      return;
    }
    const data = {
      ...this.levelForm.value, 
    }
    this.levelService.createLevel(data)
      .then(async () => {
        this.submitted = false;
        this.waiting = false;
        this.levelList.push(data)
        await this.refreshList();
        $('#cancel-btn1').click();
      })
      .catch((error) => {
        this.submitted = false;
        this.waiting = false;
      });
  }

  onLevelChange(event: any) {
    const selectedLevelId = event.target.value;
     this.selectedLevel = this.filteredLevelList.find(level => level._id === selectedLevelId);
  }

  TransfertWords(){
    // this.newLevelId = this.deleteLevelForm.value.groupHeriterId;
    this.waiting = true;
    this.newLevelId = this.selectedLevel._id;
    this.deleteLevelForm.value.levelDataId = this.levelData._id;
    if (this.deleteLevelForm.invalid) {
      return;
    }
    this.levelService.deleteLevel(this.deleteLevelForm.value.levelDataId, this.newLevelId)
      .then(async () => {
        this.modalVisible = true;
        this.waiting = false;
        // this.submitted = false;
        await this.refreshList();
        $('#cancel-btn').click();
      })
      .catch((error) => {
        this.submitted = false;
        this.waiting = false;
      });
  }

  deleteLevel(){
    this.deleteLevelForm.value.levelDataId = this.levelData._id;
    if (this.deleteLevelForm.invalid) {
      return;
    }
    this.waiting = true;
    this.levelService.deleteLevelId(this.deleteLevelForm.value.levelDataId)
      .then(async () => {
        await this.refreshList();
        this.modalVisible = true;
        // this.submitted = false;
        this.waiting = false;
        $('#cancel-btn').click();
      })
      .catch((error) => {
        this.submitted = false;
        this.waiting = false;
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
    this.wordDataService.getLevels();
  }

  getLevelList() {
    if (JSON.parse(sessionStorage.getItem('levels-list'))) {
      const data = JSON.parse(sessionStorage.getItem('levels-list'));
      this.levelList = data.levels;
      this.totalEnWords = data.enWordsLength;
      this.totalFrWords = data.frWordsLength;
      this.totalWords = data.enWordsLength + data.frWordsLength;
    }
    else {
      this.wordDataService.getLevels();
    }
  }

  get f() {
    return this.levelForm.controls;
  }
  async drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.levelList, event.previousIndex, event.currentIndex);
    if(event.previousIndex !== event.currentIndex){
      this.resortList();
      const data = this.sortabledata(this.levelList)
      this.levelService.sortLevels(data);
    }
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
    this.waiting = true;
    if (this.levelForm.invalid) {
      return;
    }
    this.levelService.updateLevel(this.levelForm.value._id, this.levelForm.value)
      .then((result) => {
        this.submitted = false;
        this.waiting = false;
        this.refreshList();
        $('#close-modal').click();
      })
      .catch((error) => {
        this.submitted = false;
        this.waiting = false;
      });
  }
}