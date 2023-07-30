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
  lang: string;
  en: boolean = false;
  fr: boolean = false;
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
    //this is to determine the text direction depending on the selected language
    translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      this.textDir = event.lang == 'fr'? 'rtl' : 'ltr';
    });
    this.lang = this.translationService.initLanguage();
    
    if (this.lang == 'en'){
      this.en = true;
      this.fr = false;
    } else if (this.lang == 'fr'){
      this.en = false;
      this.fr = true;
    } else {
      this.lang = 'en';
      this.en = true;
      this.fr = false;
    }
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.splitVal = event.url.split('/');
        this.base = this.splitVal[1];
        this.page = this.splitVal[2];
        console.log('this base', this.base);
        console.log('this.page', this.page);
      }
    });

  }

  
  ngOnInit(): void {
    this.translate.use(this.translationService.getLanguage());

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

  setEnLang(){
    this.translationService.setLanguage('en');
  }

  setFrLang(){
    this.translationService.setLanguage('fr');
  }
}
