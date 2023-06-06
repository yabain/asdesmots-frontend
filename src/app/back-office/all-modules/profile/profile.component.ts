import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  changePass = false;
  personalDetails = true;
  name:any;
  id:any;
  key:any;
  textDir: String = 'ltr';
  lang: string;
  userData: any;
  creationDate: string;
  creationTime: string;

  constructor(
    private Router: Router,
    private translate: TranslateService,
    private translationService: TranslationService,
    private userService: UserService
  ){
    this.userData = this.userService.getLocalStorageUser();
    // const words = this.userData.createdAt.split('T');
    // this.creationDate = words[0];
    // const other = words[1].split('.');
    // this.creationTime = other[0];

    //this is to determine the text direction depending on the selected language
    translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      this.textDir = event.lang == 'fr'? 'rtl' : 'ltr';
    });
    this.lang = this.translationService.initLanguage();
  }

  ngOnInit(): void {
    this.scrollToTop();
    
    this.translate.use(this.translationService.getLanguage());
    this.userService.getUserActivities(this.userData.id)
    .then((result) => {
      console.log("activities 000: ", result);
      // this.aLaUne = result;
      // this.waitingData0 = true;
    })
    .catch((error) => {
      console.error('Erreur0000: ', error.message);
    });
  }

  about() {
    this.changePass = false;
    this.personalDetails = true;
    // document.getElementById('about').classList.add('active');
    // document.getElementById('pass').classList.remove('active');
  }
  pass() {
    this.changePass = true;
    this.personalDetails = false;
    // document.getElementById('about').classList.remove('active');
    // document.getElementById('pass').classList.add('active');
  }
  editModal(template: TemplateRef<any>) {
    this.id = 1;
  }

  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  submit() {
    this.Router.navigateByUrl('/admin/mentor-profile');
  }
}
