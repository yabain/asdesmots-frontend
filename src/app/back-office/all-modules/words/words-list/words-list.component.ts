import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AllModulesService } from 'src/app/services/all-modules.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.css']
})
export class WordsListComponent implements OnInit {
  public customers: any = [];
  errorMessage: any;
  public tempId: any;
  url: any = 'customers';
  wating = true;
  usersList: any;
  userData?: any = '';
  creationDate: string;
  creationTime: string;

  constructor(
    private translate: TranslateService,
    private translationService: TranslationService,
    private srvModuleService: AllModulesService,
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.scrollToTop();
    this.translate.use(this.translationService.getLanguage());
    this.customers = localStorage.getItem('users-list');

    if (this.customers) {
      this.customers = JSON.parse(localStorage.getItem('users-list'));
      this.wating = false;
    } else {
      this.userService.getAllUsers()
      .then((result) => {
        this.customers = JSON.parse(localStorage.getItem('users-list'));
        this.wating = true;
          setTimeout(() => {
            this.wating = false;
          }, 3000);
      })
      .catch((error) => {
        console.error('Erreur: ', error.message);
        // this.toastr.error(error.message, 'Error', { timeOut: 10000 });
        this.wating = false;
      });
    }
    // else {
    //   setTimeout(() => {
    //     this.wating = false;
    //   }, 3000);
    // }

  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  // splitTime(userDateReg:any){
  //   const words = userDateReg.split('T');
  //   this.creationDate = words[0];
  //   const other = words[1].split('.');
  //   this.creationTime = other[0];}

  refreshList(){
    this.wating = true;
    this.userService.getAllUsers()
    .then((result) => {
      this.customers = JSON.parse(localStorage.getItem('users-list'));
      this.wating = true;
        setTimeout(() => {
          this.wating = false;
        }, 3000);
    })
    .catch((error) => {
      console.error('Erreur: ', error.message);
      this.toastr.error(error.message, 'Error', { timeOut: 10000 });
      this.wating = false;
    });
  }

  getCustomers() {
    // this.customers = this.srvModuleService.customers;

    // this.srvModuleService.get(this.url).subscribe((res) => {
    //     this.customers = res;
    //   },
    // );
    if (this.usersList) {
      this.customers = JSON.parse(localStorage.getItem('users-list'));
      console.log('users here also: ', this.customers);
    } else {
      this.refreshList();

    }
  }

  filter() { }
  deleteCustomer() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.getCustomers();
    });
  }

  changeStatus(userId, userStatus){
    this.userService.changeStatus(userId, userStatus)
    .then((result) => {
      this.wating = true;
        setTimeout(() => {
          this.refreshList();
          this.wating = false;
        }, 3000);
    })
    .catch((error) => {
      console.error('Erreur: ', error.message);
      this.toastr.error(error.message, 'Error', { timeOut: 10000 });
      this.wating = false;
    });
  }

  deleteUser(userId){
    this.userService.deleteUser(userId)
    .then((result) => {
      this.wating = true;
        setTimeout(() => {
          this.refreshList();
          this.wating = false;
        }, 3000);
    })
    .catch((error) => {
      console.error('Erreur: ', error.message);
      this.toastr.error(error.message, 'Error', { timeOut: 10000 });
      this.wating = false;
    });
  }

}
