import { Component, OnInit, ViewEncapsulation, Inject, AfterViewInit, HostListener  } from '@angular/core';
import { Event, NavigationStart, Router, ActivatedRoute, Params } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
import * as Feather from 'feather-icons';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service'


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit, AfterViewInit {
	adminShow: boolean = false;
	supportedLanguages = ['en', 'fr'];

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    // Vider le stockage local pour les permissions cochées
    localStorage.removeItem('checkedPermissions');
     // Vider le stockage local pour les roles cochés
     localStorage.removeItem('checkedRoles');

  }

	constructor(
		@Inject(DOCUMENT) private document: any,
		public commonService: CommonServiceService,
		private route: ActivatedRoute,
		public Router: Router,
		private translate: TranslateService,
		private translationService: TranslationService
	) {
		this.translationService.initLanguage();
		// Router.events.subscribe((event: Event) => {
		//   if (event instanceof NavigationStart) {
		//     if (
		//       event.url === '/dashboard-two' ||
		//       event.url === '/dashboard-three' ||
		//       event.url === '/dashboard-four' ||
		//       event.url === '/dashboard-five' ||
		//       event.url === '/forgot-pass' ||
		//       event.url === '/lock-screen' ||
		//       event.url === '/login-form' ||
		//       event.url === '/register' ||
		//       event.url === '/error-first' ||
		//       event.url === '/error-second' ||
		//       event.url === '/' ||
		//      !localStorage.getItem('LoginData')
		//     ) {
		//       this.adminShow = false;
		//     } else {
		//       this.adminShow = true;
		//     }
		//     if (
		//       event.url === '/forgot-pass' ||
		//       event.url === '/lock-screen' ||
		//       event.url === '/login-form' ||
		//       event.url === '/register' ||
		//       event.url === '/error-first' ||
		//       event.url === '/error-second'
		//     )
		//     {
		//       document.querySelector('body').classList.add('plain-page');
		//     } else {
		//       document.querySelector('body').classList.remove('plain-page');
		//     }
		//     // if (
		//     //   event.url === '/dashboard-five'
		//     // )
		//     // {
		//     //   document.querySelector('.main-wrapper').classList.add('container');
		//     // } else {
		//     //   document.querySelector('.main-wrapper').classList.remove('container');
		//     // }
		//     // if (
		//     //   event.url === '/error-first' ||
		//     //   event.url === '/error-second'
		//     // ) {
		//     //   document.querySelector('body').classList.add('error-page');
		//     //   document.querySelector('body').classList.remove('mat-typography');
		//     // } else {
		//     //   document.querySelector('body').classList.remove('error-page');
		//     //   document.querySelector('body').classList.add('mat-typography');
		//     // }
		//   }

		// });
	}
	ngOnInit(): void {
		// Sidebar Visible

		$('.open-layout').on("click", function (s) {
			s.preventDefault();
			$('.sidebar-layout').addClass('show-layout');
			$('.sidebar-settings').removeClass('show-settings');
		});
		$('.btn-closed').on("click", function (s) {
			s.preventDefault();
			$('.sidebar-layout').removeClass('show-layout');
		});
		$('.open-settings').on("click", function (s) {
			s.preventDefault();
			$('.sidebar-settings').addClass('show-settings');
			$('.sidebar-layout').removeClass('show-layout');
		});

		$('.btn-closed').on("click", function (s) {
			s.preventDefault();
			$('.sidebar-settings').removeClass('show-settings');
		});

		$('.open-siderbar').on("click", function (s) {
			s.preventDefault();
			$('.siderbar-view').addClass('show-sidebar');
		});

		$('.btn-closed').on("click", function (s) {
			s.preventDefault();
			$('.siderbar-view').removeClass('show-sidebar');
		});

		// Sidebar Type Two

		$(document).on('change', '.sidebar-type-two input', function () {
			if ($(this).is(':checked')) {
				$('.sidebar').addClass('sidebar-six');
				$('.sidebar-menu').addClass('sidebar-menu-six');
				$('.sidebar-menu-three').addClass('sidebar-menu-six');
				$('.menu-title').addClass('menu-title-six');
				$('.menu-title-three').addClass('menu-title-six');
				$('.header').addClass('header-six');
				$('.header-left-two').addClass('header-left-six');
				$('.user-menu').addClass('user-menu-six');
				$('.dropdown-toggle').addClass('dropdown-toggle-six');
				$('.header-two .header-left-two .logo:not(.logo-small), .header-four .header-left-four .logo:not(.logo-small)').addClass('hide-logo');
				$('.header-two .header-left-two .dark-logo, .header-four .header-left-four .dark-logo').addClass('show-logo');
			} else {
				$('.sidebar').removeClass('sidebar-six');
				$('.sidebar-menu').removeClass('sidebar-menu-six');
				$('.sidebar-menu-three').removeClass('sidebar-menu-six');
				$('.menu-title').removeClass('menu-title-six');
				$('.menu-title-three').removeClass('menu-title-six');
				$('.header').removeClass('header-six');
				$('.header-left-two').removeClass('header-left-six');
				$('.user-menu').removeClass('user-menu-six');
				$('.dropdown-toggle').removeClass('dropdown-toggle-six');
				$('.header-two .header-left-two .logo, .header-four .header-left-four .logo:not(.logo-small)').removeClass('hide-logo');
				$('.header-two .header-left-two .dark-logo, .header-four .header-left-four .dark-logo').removeClass('show-logo');
			}
		});

		// Sidebar Type Three

		$(document).on('change', '.sidebar-type-three input', function () {
			if ($(this).is(':checked')) {
				$('.sidebar').addClass('sidebar-seven');
				$('.sidebar-menu').addClass('sidebar-menu-seven');
				$('.menu-title').addClass('menu-title-seven');
				$('.header').addClass('header-seven');
				$('.header-left-two').addClass('header-left-seven');
				$('.user-menu').addClass('user-menu-seven');
				$('.dropdown-toggle').addClass('dropdown-toggle-seven');
				$('.header-two .header-left-two .logo:not(.logo-small), .header-four .header-left-four .logo:not(.logo-small)').addClass('hide-logo');
				$('.header-two .header-left-two .dark-logo, .header-four .header-left-four .dark-logo').addClass('show-logo');
			} else {
				$('.sidebar').removeClass('sidebar-seven');
				$('.sidebar-menu').removeClass('sidebar-menu-seven');
				$('.menu-title').removeClass('menu-title-seven');
				$('.header').removeClass('header-seven');
				$('.header-left-two').removeClass('header-left-seven');
				$('.user-menu').removeClass('user-menu-seven');
				$('.dropdown-toggle').removeClass('dropdown-toggle-seven');
				$('.header-two .header-left-two .logo:not(.logo-small), .header-four .header-left-four .logo:not(.logo-small)').removeClass('hide-logo');
				$('.header-two .header-left-two .dark-logo, .header-four .header-left-four .dark-logo').removeClass('show-logo');
			}
		});

		// Sidebar Type Four

		$(document).on('change', '.sidebar-type-four input', function () {
			if ($(this).is(':checked')) {
				$('.sidebar').addClass('sidebar-eight');
				$('.sidebar-menu').addClass('sidebar-menu-eight');
				$('.menu-title').addClass('menu-title-eight');
				$('.header').addClass('header-eight');
				$('.header-left-two').addClass('header-left-eight');
				$('.user-menu').addClass('user-menu-eight');
				$('.dropdown-toggle').addClass('dropdown-toggle-eight');
				$('.white-logo').addClass('show-logo');
				$('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').addClass('hide-logo');
				$('.header-two .header-left-two .logo:not(.logo-small)').removeClass('hide-logo');
				$('.header-two .header-left-two .dark-logo').removeClass('show-logo');
			} else {
				$('.sidebar').removeClass('sidebar-eight');
				$('.sidebar-menu').removeClass('sidebar-menu-eight');
				$('.menu-title').removeClass('menu-title-eight');
				$('.header').removeClass('header-eight');
				$('.header-left-two').removeClass('header-left-eight');
				$('.user-menu').removeClass('user-menu-eight');
				$('.dropdown-toggle').removeClass('dropdown-toggle-eight');
				$('.white-logo').removeClass('show-logo');
				$('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').removeClass('hide-logo');
			}
		});

		// Sidebar Type Five

		$(document).on('change', '.sidebar-type-five input', function () {
			if ($(this).is(':checked')) {
				$('.sidebar').addClass('sidebar-nine');
				$('.sidebar-menu').addClass('sidebar-menu-nine');
				$('.menu-title').addClass('menu-title-nine');
				$('.header').addClass('header-nine');
				$('.header-left-two').addClass('header-left-nine');
				$('.user-menu').addClass('user-menu-nine');
				$('.dropdown-toggle').addClass('dropdown-toggle-nine');
				$('#toggle_btn').addClass('darktoggle_btn');
				$('.white-logo').addClass('show-logo');
				$('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').addClass('hide-logo');
			} else {
				$('.sidebar').removeClass('sidebar-nine');
				$('.sidebar-menu').removeClass('sidebar-menu-nine');
				$('.menu-title').removeClass('menu-title-nine');
				$('.header').removeClass('header-nine');
				$('.header-left-two').removeClass('header-left-nine');
				$('.user-menu').removeClass('user-menu-nine');
				$('.dropdown-toggle').removeClass('dropdown-toggle-nine');
				$('#toggle_btn').removeClass('darktoggle_btn');
				$('.white-logo').removeClass('show-logo');
				$('.header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)').removeClass('hide-logo');
			}
		});

		//Primary Skin one

		$(document).on('change', '.primary-skin-one input', function () {
			if ($(this).is(':checked')) {
				$('.sidebar-menu').addClass('sidebar-menu-ten');
			} else {
				$('.sidebar-menu').removeClass('sidebar-menu-ten');

			}
		});

		//Primary Skin Two

		$(document).on('change', '.primary-skin-two input', function () {
			if ($(this).is(':checked')) {
				$('.sidebar-menu').addClass('sidebar-menu-eleven');
			} else {
				$('.sidebar-menu').removeClass('sidebar-menu-eleven');

			}
		});

		//Primary Skin Three

		$(document).on('change', '.primary-skin-three input', function () {
			if ($(this).is(':checked')) {
				$('.sidebar-menu').addClass('sidebar-menu-twelve');
			} else {
				$('.sidebar-menu').removeClass('sidebar-menu-twelve');

			}
		});
	}
	ngAfterViewInit() {
		Feather.replace();

	}

}


