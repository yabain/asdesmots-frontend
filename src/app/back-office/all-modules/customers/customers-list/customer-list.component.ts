import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AllModulesService } from 'src/app/services/all-modules.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { ErrorsService } from 'src/app/shared/services/errors/errors.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public customers: any = [];
  errorMessage: any;
  public tempId: any;
  url: any = 'customers';
  wating = true;
  usersList: any;
  userData?: any = '';
  creationDate: string;
  creationTime: string;
  waitingResponse = false;
  submitted = false;

  constructor(
    private translate: TranslateService,
    private translationService: TranslationService,
    private srvModuleService: AllModulesService,
    private userService: UserService,
    private toastr: ToastrService,
    private errorsService: ErrorsService) { }

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
        this.errorsService.errorsInformations(error, 'get users')
        // console.error('Erreur: ', error.message);
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
    // if (this.usersList) {
    //   this.customers = JSON.parse(localStorage.getItem('users-list'));
    //   console.log('users here also: ', this.customers);
    // } else {
    //   this.refreshList();

    // }
  }

  filter() { }

  deleteCustomer() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.getCustomers();
    });
  }

  changeStatus(userId, userStatus){
    // this.wating = true;
    this.submitted = true;
    this.waitingResponse = true;
    // this.toastr.warning("Cette fonctionnalité n'est pas encore achevée et le changement risque ne pas marcher. Veuillez essayer ultérieurement", 'Warning', { timeOut: 10000 });
    this.userService.changeStatus(userId, userStatus)
    .then((result) => {
        setTimeout(() => {
          this.refreshList();
          // this.wating = false;
          this.submitted = false;
          this.waitingResponse = false;
          $('#cancel-btn1').click();
        }, 1000);
    })
    .catch((error) => {
      this.errorsService.errorsInformations(error, 'change status');
      this.wating = false;
      this.submitted = false;
      this.waitingResponse = false;
    });
  }

  deleteUser(userId){
    this.submitted = true;
    this.waitingResponse = true;
    this.userService.deleteUser(userId)
    .then((result) => {
      this.wating = true;
        setTimeout(() => {
          this.refreshList();
          this.wating = false;
          this.submitted = false;
          this.waitingResponse = false;
          $('#cancel-btn2').click();
        }, 1000);
    })
    .catch((error) => {
      this.errorsService.errorsInformations(error, 'delete user');
      // console.error('Erreur: ', error.message);
      // this.toastr.error(error.message, 'Error', { timeOut: 10000 });
      this.wating = false;
      this.submitted = false;
      this.waitingResponse = false;
    });
  }

}
