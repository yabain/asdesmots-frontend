import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user/user.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.css'],
})
export class WordDetailsComponent implements OnInit, OnChanges {
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
  waitingResponse = false;
  submitted = false;

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private translationService: TranslationService,
    private formLog: FormBuilder,
    private toastr: ToastrService,
  ) {
    if (!this.userData) {
      this.userData = this.userService.getLocalStorageUser();
      console.log("user details1: ", this.userData);
    }
    console.log('user details');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userData && this.generalForm) {
      this.userData = changes.userData.currentValue;
      this.generalForm.controls.firstName.setValue(this.userData.firstName);
      this.generalForm.controls.lastName.setValue(this.userData.lastName);
      this.generalForm.controls.skype.setValue(this.userData.skype);
      this.generalForm.controls.websiteLink.setValue(this.userData.websiteLink);
      this.generalForm.controls.bio.setValue(this.userData.bio);
    }
    if (changes.userData && this.contactForm) {
      this.userData = changes.userData.currentValue;
      this.contactForm.controls.phone.setValue(this.userData.phone);
      this.contactForm.controls.phone2.setValue(this.userData.phone2);
      this.contactForm.controls.email.setValue(this.userData.email);
      this.contactForm.controls.zip.setValue(this.userData.zip);
    }
    if (changes.userData && this.locationForm) {
      this.userData = changes.userData.currentValue;
      this.locationForm.controls.country.setValue(this.userData.country);
      this.locationForm.controls.city.setValue(this.userData.city);
      this.locationForm.controls.address1.setValue(this.userData.address1);
      this.locationForm.controls.address2.setValue(this.userData.address2);
    }
    if (changes.userData && this.accountForm) {
      this.userData = changes.userData.currentValue;
      this.accountForm.controls.userId.setValue(this.userData.id);
      this.accountForm.controls.lang.setValue(this.userData.lang);
      // this.accountForm.controls.status.setValue(this.userData.status);
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.scrollToTop();
    this.translate.use(this.translationService.getCurrentLanguage());
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
      'userId': [this.userData.id, Validators.required],
      'lang': [this.userData.lang, Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'timeFormat': [this.userData.timeFormat, Validators.required],
      'AccountType': [this.userData.AccountType, Validators.required],
    });
  }
  changeStatus(id: number, status: string) {
    this.userService.changeStatus(id, status);
  }

  submitGeneral() {
    this.submitted = true;
    this.waitingResponse = true;
    console.log("General datas: ", this.generalForm.value);
    this.userService.updateUser(this.userData.id, this.generalForm.value)
    .then((result) => {
          this.toastr.success('General informations saved!', 'Done', { timeOut: 10000 });
          this.submitted = false;
          this.waitingResponse = false;
    })
    .catch((error) => {
      this.waitingResponse = false;
      this.submitted = false;
    });
  }

  submitContact() {
    this.submitted = true;
    this.waitingResponse = true;
    console.log("Contact datas: ", this.contactForm.value);
    this.userService.updateUser(this.userData.id, this.contactForm.value)
    .then((result) => {
          this.toastr.success('Contact informations saved!', 'Done', { timeOut: 10000 });
          this.submitted = false;
          this.waitingResponse = false;
    })
    .catch((error) => {
      this.waitingResponse = false;
      this.submitted = false;
    });
  }

  submitLocation() {
    this.submitted = true;
    this.waitingResponse = true;
    console.log("Location datas: ", this.locationForm.value);
    this.userService.updateUser(this.userData.id, this.locationForm.value)
    .then((result) => {
          this.toastr.success('Location informations saved!', 'Done', { timeOut: 10000 });
          this.submitted = false;
          this.waitingResponse = false;
    })
    .catch((error) => {
      this.waitingResponse = false;
      this.submitted = false;
    });
  }

  submitAccount() {
    this.submitted = true;
    this.waitingResponse = true;
    console.log("Account datas: ", this.accountForm.value);
    this.userService.updateUser(this.userData.id, this.accountForm.value)
    .then((result) => {
          this.toastr.success('Account informations saved!', 'Done', { timeOut: 10000 });
          this.submitted = false;
          this.waitingResponse = false;
    })
    .catch((error) => {
      this.waitingResponse = false;
      this.submitted = false;
    });
  }


}
