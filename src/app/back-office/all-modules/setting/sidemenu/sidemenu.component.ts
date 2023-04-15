import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  name:any
  splitVal;
  base;
  page;
  url;
  constructor(
    private router: Router,
    location: Location,
    public commonService: CommonServiceService,
    private authService: AuthService,
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event instanceof NavigationStart) {
          this.splitVal = event.url.split('/');
          this.base = this.splitVal[1];
          this.page = this.splitVal[2];
        }
      }
    });
    this.url = location.path();
    if(this.url) {
      this.splitVal = this.url.split('/');
          this.base = this.splitVal[1];
          this.page = this.splitVal[2];
    }
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logOut();
    this.commonService.nextmessage('logout');
  }

  navigate(name:any) {
    this.name = name;
    this.commonService.nextmessage(name);
  }
}
