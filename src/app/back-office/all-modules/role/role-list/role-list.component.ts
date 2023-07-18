import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';
import { Role } from '../service/role.model';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roleChoose!: Role;
  
  constructor(public roleService: RoleService) {
      this.loadListRole();
   }

  ngOnInit(): void {
  }

  loadListRole(){
      if(this.roleService.listRole.length == 0){
          this.roleService.getListRole();
      }
  }

  deleteRole(roe: Role){
      console.log('role to delete', this.roleChoose);
      console.log('role to delete', roe);

  }
}
