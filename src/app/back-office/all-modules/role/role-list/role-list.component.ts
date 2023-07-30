import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';
import { Role } from '../service/role.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roleChoose: Role = new Role();
  idRole: string = '';
  constructor(public roleService: RoleService, 
              private router: Router  
              ) {
      this.loadListRole();
      this.roleService.initFormUpdate();
      this.roleService.initAddingForm();
   }

  ngOnInit(): void {
  }

  loadListRole(){
      if(this.roleService.listRole.length == 0){
          this.roleService.getListRole();
      }
  }

  setValue(role: Role){
      this.roleService.initUpdateForm(role);

      if(this.roleService.listPermission.length == 0){
          this.roleService.getListPermission();
      }
  }

  navigate(id: string){
        this.router.navigateByUrl('role/users/' +id);
  }
  
  navigateToPermissionList(id: string){
        this.router.navigateByUrl('role/list/permission/'+id);
  }

  goToListUser(){

  }

  addPermission(){
        this.roleService.addPermissionOnRole({roleId: this.roleChoose._id, permissionId: this.roleService.formAddPermission.get('idPermission')?.value });
  }

  doDelete(){
      this.roleService.deleteRole(this.roleChoose);
  }
  reset(){
    this.roleService.permissionAdded = false;
  }
}
