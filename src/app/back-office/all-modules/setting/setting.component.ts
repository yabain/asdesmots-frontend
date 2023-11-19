import { Component, OnInit } from '@angular/core';
import { Router,Event, NavigationStart } from '@angular/router';

import { CommonServiceService } from 'src/app/shared/services/common-service.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  splitVal:any
  url:any
  base = 'Doctor';
  page = 'Dashboard';
  doctorSidebar: boolean = true;

  constructor(private router: Router,
    public commonService: CommonServiceService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });
  }

}
