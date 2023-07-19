import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  waitingResponse = false;
  submitted = true;
  levels: any;
  levelList?: any = '';
  levelData?: any = '';
  public levelControler: any

  name: any
  splitVal;
  base;
  page;
  url;
  curentLevel;
  levelForm: FormGroup;
  deleteLevelForm: FormGroup;

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
  }

  ngOnInit() {
    this.translate.use(this.translationService.getLanguage());
    this.getLevelList();
    this.levelForm = this.formLog.group({
      'name': ['', Validators.required
      ],
      'description': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])
      ]
    });

    this.deleteLevelForm = this.formLog.group({
      'levelDataId': [''],
      'groupHeriterId': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])
      ]
    });

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

  navigate(name: any) {
    this.name = name;
    this.commonService.nextmessage(name);
  }

  refreshList() {
    this.waitingResponse = true;
    this.levelService.getAllLevels()
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
    console.log("la liste des level00: ", JSON.parse(localStorage.getItem('levels-list')));
    if (JSON.parse(localStorage.getItem('levels-list'))) {
      this.levelList = JSON.parse(localStorage.getItem('levels-list'));
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

}
