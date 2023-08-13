import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  customers : any;
  wating:  boolean = false;
  userData : User = new User();
  formAddRole: FormGroup;

  constructor(
        private translate: TranslateService,
        private translationService: TranslationService,
        public roleService: RoleService,
        private userService: UserService,
        private toastr: ToastrService,
        private fb: FormBuilder,
        private location: Location
        
  ) { 
    this.translate.use(this.translationService.getLanguage());
    this.initForm();
    this.loadUsers();
    this.initTranslation();
  }

  ngOnInit(): void {

  }

  initTranslation(){
      this.translate.use(this.translationService.getLanguage());
  }

  initForm(){
      this.formAddRole = this.fb.group({
          idRole: ['', Validators.required]
      });
  }

  loadUsers(){
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
          this.toastr.error(error.message, '', {timeOut: 7000 });
        this.wating = false;
      });
    }
  }

  doAddRole(){
      console.log('data to add', {userId: this.userData._id, roleId: this.formAddRole.get('idRole').value})
      this.roleService.addRoleOnUser({userId: this.userData._id, roleId: this.formAddRole.get('idRole').value});
  }

  refreshList(){
    this.loadUsers();
  }

  reset(){
    this.roleService.roleAdded = false;
  }

  backClicked(){
      this.location.back();
  }
}
