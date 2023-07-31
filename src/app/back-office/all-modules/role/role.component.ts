import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './service/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  currentRoute: string;

  constructor(private roleService: RoleService){
        
    }
    
  ngOnInit(): void {
  }

  refreshList(){
      this.roleService.getListRole();
  }


}
