import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/services/entities/user';
import { TranslationService } from 'src/app/services/translation/language.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  @Input() userData?: any;
  @Input() isAdmin?: boolean = true;
  @Input() isEditable?: boolean = true;
  @Input() creationDate?: string;
  @Input() creationTime?: string;

  @Input() userLang?: any;
  @Input() userTheme?: any;
  @Input() isEnglishTimeFormat?: any;


  generalForm: FormGroup;
  contactForm: FormGroup;
  locationForm: FormGroup;
  accountForm: FormGroup;

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private translationService: TranslationService,
    private formLog: FormBuilder,
  ) {
    if(!this.userData){
      this.userData = this.userService.getLocalStorageUser();
      console.log("user details1: ", this.userData);
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.scrollToTop();
    this.translate.use(this.translationService.getLanguage());
    console.log("user details: ", this.userData);

    this.generalForm = this.formLog.group({
      'firstName': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'lastName': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'skype': ['', Validators.compose([
        Validators.pattern("^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)")])],
      'websiteLink': ['', Validators.compose([
        Validators.pattern("^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)")])],
      'bio': [''],
    });

    this.contactForm = this.formLog.group({
      'phone': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'phone2': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      'zip': [''],
    });

    this.locationForm = this.formLog.group({
      'country': ['',
        Validators.required],
      'city': ['',
        Validators.required,],
      'address1': ['',
        Validators.required,],
      'address2': ['',
        Validators.required,],
    });


    this.accountForm = this.formLog.group({
      // 'firstName': ['', Validators.compose([
      //   Validators.required,
      //   Validators.minLength(4)])],
      // 'lastName': ['', Validators.compose([
      //   Validators.required,
      //   Validators.minLength(4)])],
      // 'skype': ['', Validators.compose([
      //   Validators.pattern("^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)")])],
      // 'websiteLink': ['', Validators.compose([
      //   Validators.pattern("^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)")])],
      // 'bio': [''],
    });
  }

  submitGeneral() {
    console.log("General datas: ", this.generalForm.value)
  }

  submitContact() {
    console.log("General datas: ", this.contactForm.value)
  }

  submitLocation() {
    console.log("General datas: ", this.locationForm.value)
  }

  submitAccount() {
    console.log("General datas: ", this.accountForm.value)
  }

}
