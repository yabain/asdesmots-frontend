import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { RoleService } from '../service/role.service';
import { User } from 'src/app/shared/entities/user';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { ToastrService } from 'ngx-toastr';
import { log } from 'console';



@Component({
  selector: 'app-role-users',
  templateUrl: './role-users.component.html',
  styleUrls: ['./role-users.component.css']
})
export class RoleUsersComponent implements OnInit, AfterViewInit {


  id : string = '';
  userData: User = new User();
  roleChooseName: any;
  controlModal: boolean = true;
  removeDone: boolean = false;
  waitingResponse: boolean = false;



  constructor(private route: ActivatedRoute,
              public roleService: RoleService,
              private router: Router,
              private location: Location,
              private toastr: ToastrService,
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
    this.getRoleName()
  }



  getIDRole(){
    this.id = this.route.snapshot.params['idrole'];
  }

  initTranslation(){
      this.translate.use(this.translation.getCurrentLanguage());
  }
  getRoleName(){
   this.roleChooseName = this.roleService.getNameOfRole(this.id);
   return this.roleChooseName
   
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
    this.removeDone = false;
    this.waitingResponse = true;
    console.log("id role: ", this.id);
    const roleId = this.id;
    const userId = this.userData._id;
    console.log("user id",this.userData._id);
      this.roleService.removeRole(roleId, userId).subscribe(
      (resp) => {
        // Gérer la réponse du serveur en cas de succès
        this.waitingResponse = false;
        const closeButton = document.getElementById('cancel-btn2');
        if (closeButton) {
        closeButton.click();
      }
      this.roleService.getUsersByRoleId(roleId);
      },
      (error) => {
        // Gérer les erreurs du serveur
        this.waitingResponse = false;
      }
    );
  }

  loadListUsers(){
      this.roleService.getUsersByRoleId(this.id);
  }

  backClicked(){
      this.location.back();
  }

}
