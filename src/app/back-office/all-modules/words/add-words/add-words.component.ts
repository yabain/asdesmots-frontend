import { Component, OnInit, TemplateRef } from '@angular/core';
// import { CommonServiceService } from 'src/app/services/common-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { WordsService } from 'src/app/shared/services/words/words.service';
import { ErrorsService } from 'src/app/shared/services/errors/errors.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.css']
})
export class AddWordsComponent implements OnInit {


  public pipe = new DatePipe("en-US");
  public wordEnForm!: FormGroup;
  public wordFrForm!: FormGroup;
  levelList?: any = '';
  addingWords: boolean = false;
  waitingResponse = false

  constructor(public router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private formLog: FormBuilder,
    private levelService: LevelService,
    private wordService: WordsService,
    private translationService: TranslationService,
    private errorsService: ErrorsService,
    private location: Location) {
    this.waitingResponse = true;

    if (!localStorage.getItem('levels-list')) {
      this.levelService.getAllLevels()
        .then(() => {
          this.levelList = JSON.parse(localStorage.getItem('levels-list'));
          console.log('levelList good: ', this.levelList);
          this.waitingResponse = false;
        });
    }
    else {
          this.levelList = JSON.parse(localStorage.getItem('levels-list'));
      this.waitingResponse = false;
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.translate.use(this.translationService.getCurrentLanguage());
    this.scrollToTop();

    this.wordEnForm = this.formLog.group({
      'name': ['', Validators.required
      ],
      'description': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])
      ],
      'gameLevelId': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])
      ],
      'type': ['en', Validators.required
      ]
    });

    this.wordFrForm = this.formLog.group({
      'name': ['', Validators.required
      ],
      'description': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])
      ],
      'gameLevelId': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])
      ],
      'type': ['fr', Validators.required
      ]
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }


  addWords() {
    if (this.wordEnForm.invalid && this.wordFrForm.invalid) {
      this.toastr.error('The form is invalid', 'Infalid form', { timeOut: 10000 });
      return;
    } else {
      console.log("les informations du mot envoyé: ", this.wordFrForm.value);
      this.wordService.createWord([this.wordEnForm.value, this.wordFrForm.value])
      .then(() => {
              console.log("mes tableaux: ", this.wordEnForm.value, this.wordFrForm.value)
              this.addingWords = false;
              this.toastr.success('French word was added', 'Done', { timeOut: 10000 });
              // this.wordFrForm.reset();
            })
            .catch((error) => {
              // console.log('fr form: ', this.wordFrForm.value);
              this.errorsService.errorsInformations(error, 'add french word');
              this.addingWords = false;
            });
    }

    // if (this.wordEnForm.valid) {
    //   this.addingWords = true;
    //   this.wordService.createWord(this.wordEnForm.value, this.wordEnForm.value.gameLevelId)
    //     .then(() => {
    //       this.levelService.getAllLevels(true);
    //       this.addingWords = false;
    //       this.toastr.success('English word was added', 'Done', { timeOut: 10000 });
    //       this.wordEnForm.reset(); // reset form after submit
    //     setTimeout(() => {location.reload();}, 1000);
    //     })
    //     .catch((error) => {
    //       this.errorsService.errorsInformations(error, 'add english word');
    //       // console.log('en form: ', this.wordEnForm.value);
    //       this.addingWords = false;
    //     });
    // }

    // if (this.wordFrForm.valid) {
    //   this.addingWords = true;
    //   this.wordService.createWord(this.wordFrForm.value, this.wordFrForm.value.gameLevelId)
    //     .then(() => {
    //       this.addingWords = false;
    //       this.toastr.success('French word was added', 'Done', { timeOut: 10000 });
    //       this.wordFrForm.reset();
    //     })
    //     .catch((error) => {
    //       // console.log('fr form: ', this.wordFrForm.value);
    //       this.errorsService.errorsInformations(error, 'add french word');
    //       this.addingWords = false;
    //     });
    // }

    // this.removeWordListInLevel();
    // this.levelService.getAllLevels(true);
  }

  removeWordListInLevel() {
    for (let i = 0; i < this.levelList.length; i++) {
      // console.log("test id key", this.levelList[i]._id);
      localStorage.removeItem(this.levelList[i]._id);
    }
  }

  get f() {
    return this.wordEnForm.controls;
  }

  backClicked() {
    this.location.back();
  }
}
