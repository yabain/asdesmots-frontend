import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      public roleService: RoleService
  ) { 
      this.getRoleData();
  }

  ngOnInit(): void {

  }

  getRoleData(){
    this.roleId = this.router.snapshot.params['id'];
    this.listPermission = Array.from(this.roleService.getRoleData(this.roleId).permissions);
    console.log('application permission', this.listPermission);
  }

  doRemovePermission(idPermission: string){
    this.roleService.removePermission({roleId : this.roleId, permissionId: idPermission});
  }

  doDelete(){

  }

}
