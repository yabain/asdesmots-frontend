import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
declare var $: any;

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  showDropdown = true;
  languages: languageModel[] = [
    {name: 'English', value: 'en', flagImg:'assets/img/flags/us.png'},
    {name: 'Français', value: 'fr', flagImg:'assets/img/flags/fr.png'}
  ]
  currentLang: languageModel;
  public bellCollapsed = true;
  public userCollapsed = true;
  public langCollapsed = true;
  textDir: String = 'ltr';

  splitVal:any
  base = '';
  page = '';
  userData: any;

  constructor(
    public router: Router,
    private commonService: DataService,
    private authService: AuthService,
    private userService: UserService,
    private translate: TranslateService,
    public translationService: TranslationService
  ) {
    let lang = this.translationService.getCurrentLanguage() ?? 'fr';
    switch(lang) {
      case 'en' : 
        this.currentLang = this.languages[0];
        break;
      case 'fr' : 
        this.currentLang = this.languages[1];
        break;
      default :
        this.currentLang = this.languages[1];
    }
    
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
      }
    });

  }

  
  ngOnInit(): void {
    this.translate.use(this.translationService.getCurrentLanguage());

    $(document).on('click', '#filter_search', function() {
      $('#filter_inputs').slideToggle("slow");
    });
    $(document).on('mouseover', function(e:any) {
      e.stopPropagation();
      if($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
          var targ = $(e.target).closest('.sidebar').length;
          if(targ) {
              $('body').addClass('expand-menu');
              $('.subdrop + ul').slideDown();
          } else {
              $('body').removeClass('expand-menu');
              $('.subdrop + ul').slideUp();
          }
          return false;
      }
  });

  this.userData = this.userService.getLocalStorageUser();
  }

  ngAfterViewInit() {
    this.loadDynmicallyScript('./../../../assets/js/script.js');
  }
  loadDynmicallyScript(js:any) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}
  change(name:any) {
    this.page = name;
    // this.commonService.nextmessage('admin');
  }
  home() {
    // this.router.navigate(['/index']);
    window.location.href = '/index';
  }

  main() {
    // this.commonService.nextmessage('main');
  }
  clickLogout() {
    window.location.href = '/index';
  }
  burgerMenu() {
    if($('body').hasClass('mini-sidebar')) {
      $('body').removeClass('mini-sidebar');
      $('.subdrop + ul').slideDown();
    } else {
      $('body').addClass('mini-sidebar');
      $('.subdrop + ul').slideUp();
    }
    return false;
  }

  Logout(){
    this.authService.logOut();
  }

  setLanguage(language: languageModel) {
    this.translationService.setLanguage(language.value);
    this.currentLang = language;
  }
}
class languageModel {
  name!: string;
  value!: string;
  flagImg!: string;
}
