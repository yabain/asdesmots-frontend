import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
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
export class UserDetailsComponent implements OnInit, OnChanges {
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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userData && this.generalForm) {
          this.userData = changes.userData.currentValue;
          console.log("user details2: ", this.userData);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
          this.generalForm.controls.lastName.setValue(this.userData.lastName);
          this.generalForm.controls.skype.setValue(this.userData.skype);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
          this.generalForm.controls.firstName.setValue(this.userData.firstName);
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
      'firstName': [this.userData.firstName, Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'lastName': [this.userData.lastName, Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'skype': [this.userData.skype, Validators.compose([
        Validators.pattern("^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)")])],
      'websiteLink': [this.userData.websiteLink, Validators.compose([
        Validators.pattern("^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)")])],
      'bio': [this.userData.bio],
    });

    this.contactForm = this.formLog.group({
      'phone': [this.userData.phone, Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'phone2': [this.userData.phone2, Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'email': [this.userData.email, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      'zip': [this.userData.zip],
    });

    this.locationForm = this.formLog.group({
      'country': [this.userData.country,
        Validators.required],
      'city': [this.userData.city,
        Validators.required,],
      'address1': [this.userData.address1,
        Validators.required,],
      'address2': [this.userData.address2,
        Validators.required,],
    });

    this.accountForm = this.formLog.group({
      'lang': [this.userData.lang, Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'timeFormat': [this.userData.timeFormat, Validators.required],
      'AccountType': [this.userData.AccountType, Validators.required],
    });
  }
  changeStatus(id: number, status: string) {
    // this.service.changeStatus(id, status, this.currentFilter);
  }

  submitGeneral() {
    console.log("General datas: ", this.generalForm.value)
  }

  submitContact() {
    console.log("Contact datas: ", this.contactForm.value)
  }

  submitLocation() {
    console.log("Location datas: ", this.locationForm.value)
  }

  submitAccount() {
    console.log("Account datas: ", this.accountForm.value)
  }
  

}
