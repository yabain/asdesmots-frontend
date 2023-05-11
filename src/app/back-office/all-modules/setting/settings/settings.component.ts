import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/language.service';
import { UserService } from 'src/app/services/user/user.service';
declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  userData: any;
  creationDate: string = '';
  creationTime: string = '';
  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private translationService: TranslationService
    ) {
    this.userData = this.userService.getLocalStorageUser();
    console.log("test test: ", this.userData)
    // const words = this.userData.registered_on.split('T');
    // this.creationDate = words[0];
    // const other = words[1].split('.');
    // this.creationTime = other[0];
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.scrollToTop();
    // this.userData = this.userService.getLocalStorageUser();
    // Pricing Options Show
    this.translate.use(this.translationService.getLanguage());

  }
  files: File[] = [];

  onSelect(event:any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
