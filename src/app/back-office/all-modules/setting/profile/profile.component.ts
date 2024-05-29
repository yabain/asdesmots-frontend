import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: any;
  creationDate: string = '';
  creationTime: string = '';
  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private translationService: TranslationService
  ) {
    this.scrollToTop();
    this.userData = this.userService.getLocalStorageUser();
    console.log("current user: " + this.userData);
    // console.log("test test: ", this.userData)
    // const words = this.userData.createdAt.split('T');
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
    this.translate.use(this.translationService.getCurrentLanguage());

  }
  files: File[] = [];

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
