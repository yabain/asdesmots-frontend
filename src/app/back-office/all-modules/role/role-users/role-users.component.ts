import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { RoleService } from '../service/role.service';
import { User } from 'src/app/shared/entities/user';

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
              private cdRef:ChangeDetectorRef
              ) { 
                  
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

}
