import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  currentRoute: string;

  constructor(private router: Router){
        
    }
    
  ngOnInit(): void {
  }

}
