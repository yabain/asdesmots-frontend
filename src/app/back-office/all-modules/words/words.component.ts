import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AllModulesService } from 'src/app/services/all-modules.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css'],
})
export class WordsComponent implements OnInit {
  waiting: boolean = false;
  words: Array<string> = [];

  constructor(
    private srvModuleService: AllModulesService,
    private userService: UserService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.scrollToTop();

  }
  
scrollToTop(): void {
  window.scrollTo(0, 0);
}

  // refreshList(){
  //   this.waiting = true;
  //   this.userService.getAllUsers()
  //   .then((result) => {
  //     this.words = JSON.parse(localStorage.getItem('words-list'));
  //     this.waiting = true;
  //       setTimeout(() => {
  //         this.waiting = false;
  //       }, 3000);
  //   })
  //   .catch((error) => {
  //     console.error('Erreur: ', error.message);
  //     this.toastr.error(error.message, 'Error', { timeOut: 10000 });
  //     this.waiting = false;
  //   });
  // }

}
