import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RoleService } from './service/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  currentRoute: string;

  constructor(private roleService: RoleService,
              private router: Router,
              ){
        
    }
    
  ngOnInit(): void {
      this.getUrl();
      this.onUrlChange();
  }

  getUrl(){
    const url = this.router.url.split('/');
    if(/\d/.test(url[url.length-1])){
      //check if the last url path contains number, in true case, get the role name as current route
      this.currentRoute = this.roleService.getRoleData(url[url.length-1]).name;
    }else{
      this.currentRoute = url[url.length-1];
    }
  }

  refreshList(){
      this.roleService.getListRole();
  }

  onUrlChange(){
      this.router.events.subscribe((event)=>{
            if(event instanceof NavigationEnd){
                this.getUrl();
            }
      })
  }

}
