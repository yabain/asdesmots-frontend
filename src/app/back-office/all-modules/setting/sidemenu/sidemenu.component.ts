import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/language.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  waitingResponse = false;
  submitted = false;
  name: any
  splitVal;
  base;
  page;
  url;
  constructor(
    private router: Router,
    location: Location,
    public commonService: CommonServiceService,
    private authService: AuthService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private translationService: TranslationService
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
    if (this.url) {
      this.splitVal = this.url.split('/');
      this.base = this.splitVal[1];
      this.page = this.splitVal[2];
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.scrollToTop();
    this.translate.use(this.translationService.getLanguage());
  }

  logout() {
    this.submitted = true;
    this.waitingResponse = true;
    setTimeout(() => {
    this.authService.logOut()
    .then((result) => {
          localStorage.clear();
          this.commonService.nextmessage('logout');
          this.toastr.success('Your session has been disconnected!', null, { timeOut: 5000 });
          this.router.navigate(["/login"]);
          this.submitted = false;
          this.waitingResponse = false;
    })
    .catch((error) => {
      console.error('Erreur: ', error.message);
      this.toastr.error(error.message, 'Error', { timeOut: 10000 });
      this.waitingResponse = false;
    });
  }, 2000);
  }


  navigate(name: any) {
    this.name = name;
    this.commonService.nextmessage(name);
  }
}
