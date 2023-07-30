import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {

  constructor(public roleService: RoleService) { 
      this.roleService.initFormCreatingRole();
  }

  ngOnInit(): void {

  }

  resetFormCreation(){
    this.roleService.formCreateRole.reset();
    this.roleService.creationDone = false;
  }

  createRole(){
      this.roleService.createRole();
      this.resetFormCreation()
  }

}
