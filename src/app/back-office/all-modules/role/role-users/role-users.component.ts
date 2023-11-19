import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { RoleService } from '../service/role.service';
import { User } from 'src/app/shared/entities/user';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-role-users',
  templateUrl: './role-users.component.html',
  styleUrls: ['./role-users.component.css']
})
export class RoleUsersComponent implements OnInit {
  id : string = '';
  userData: User = new User();
  roleChooseName: any;

  constructor(private route: ActivatedRoute, 
              public roleService: RoleService,
              private router: Router,
              private location: Location,
              private translate: TranslateService,
              private translation: TranslationService,
              private cdRef:ChangeDetectorRef
              ) { 
                this.initTranslation();   
              }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.getIDRole();
    this.loadListUsers(); 
    this.startListener();
    this.cdRef.detectChanges();
  }



  getIDRole(){
    this.id = this.route.snapshot.params['idrole'];  
  }

  initTranslation(){
      this.translate.use(this.translation.getLanguage());
  }
  getRoleName(){
   this.roleChooseName = this.roleService.getNameOfRole(this.id);
  }

  startListener(){
      this.router.events.subscribe((event)=>{
          if(event instanceof NavigationStart){
              this.getIDRole();
              this.loadListUsers();
          }
      })
  }

  doRemove(){
      this.roleService.removeRole({roleId : this.id, userId: this.userData._id});
  }

  loadListUsers(){
      this.roleService.getUsersByRoleId(this.id);
  }

  backClicked(){
      this.location.back();
  }

}
