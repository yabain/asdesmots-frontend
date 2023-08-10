import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { RoleService } from '../service/role.service';
import { Permission } from 'src/app/shared/entities/permission';

@Component({
  selector: 'app-rolepermissionlist',
  templateUrl: './rolepermissionlist.component.html',
  styleUrls: ['./rolepermissionlist.component.css']
})
export class RolepermissionlistComponent implements OnInit {
  roleId : string = '';

  permissionData : Permission = new Permission();
  listPermission: Permission[]=[];

  constructor(
      private router:  ActivatedRoute,
      private route: Router,
      public roleService: RoleService,
  ) { 
      this.getRoleData();
      this.startListener();
  }

  ngOnInit(): void {

  }
  ChangeDetectorRef(){
      console.log('Url Change', this.router.snapshot.params['id']);
  }
  getRoleData(){
    this.roleId = this.router.snapshot.params['id'];
    this.listPermission = this.roleService.getRoleData(this.roleId).permissions;
    console.log('application permission', this.listPermission);
  }

  startListener(){
    //on id on url change...
    this.route.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
          this.getRoleData();
      }
    });
  } 

  doRemovePermission(idPermission: string){
    this.roleService.removePermission({roleId : this.roleId, permissionId: idPermission});
  }

}
