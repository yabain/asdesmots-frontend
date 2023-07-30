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

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.css']
})
export class AddWordsComponent implements OnInit {
  public pipe = new DatePipe("en-US");
  public wordEnForm!: FormGroup;
  levelList?: any = '';
  waitingResponse = false

  constructor(public router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private formLog: FormBuilder,
    private levelService: LevelService,
    private wordService: WordsService,
    private translationService: TranslationService) {

      this.levelService.getAllLevels()
        .then(() => {
          // this.waitingResponse = false;
          this.levelList = this.levelService.levelList;
          console.log('levelList good: ', this.levelList)
        });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.translate.use(this.translationService.getLanguage());
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
    if (this.wordEnForm.invalid) {
      return;
    }
      this.waitingResponse = true;
      this.wordService.createWord(this.wordEnForm.value)
      .then(() => {
        this.waitingResponse = false;
        this.toastr.success('French word was added', 'Done',{timeOut: 10000} )
      })
      .catch((error) => {
        this.waitingResponse = false;
      });
    
  }


  get f() {
    return this.wordEnForm.controls;
  }

}
