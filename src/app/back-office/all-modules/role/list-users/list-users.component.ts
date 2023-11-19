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
  roleChoose: {userId: string, roleId: string }[] = [];

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

  refreshList(){
    this.loadUsers();
  }

  async addRole(roleID: string, isEnable: boolean){
    const isRoleIDalreadyPresent = async (id: string)=>{
        const index = this.roleChoose.findIndex((role)=> role.roleId === id);
        
        return (index == -1) ;
    }

    const getIndex = async (id: string )=>{
          return this.roleChoose.findIndex((role)=> role.roleId === id);
    }

      if(await isRoleIDalreadyPresent(roleID)){
          if(!isEnable){
            this.roleChoose.push({
              userId: '', 
              roleId: roleID
             });
          }
      }else{
          this.roleChoose.splice(await getIndex(roleID), 1);
      }

  }

  saveChange(){
      this.roleChoose.map((value)=>{
        value.userId = this.userData._id
      });

      console.log('list role', this.roleChoose);
      //this.roleService.addRoleOnUser(this.roleChoose);
      this.roleChoose = [];
  }

  reset(){
    this.roleChoose = [];
    this.roleService.roleAdded = false;
    this.roleService.resetListBuild();
  }

  buildListRoleChooseUser(user: User){
     this.userData = user;
     this.roleService.getListRoleByUserID(user._id);
  }
  
  backClicked(){
      this.location.back();
  }
}
