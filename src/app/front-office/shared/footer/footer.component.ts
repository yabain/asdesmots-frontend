import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  textDir: String = 'ltr';
  
  constructor(
    private router: Router
    ) {
  }

  ngOnInit() {
  }

  navigateToHome() {
    this.router.navigate(['/front']);
  }

  navigateToBlog() {
    this.router.navigate(['/front/blog-post']);
  }

  navigateToContact() {
    this.router.navigate(['/front/contact']);
  }

  navigateToAbout() {
    this.router.navigate(['/front/about']);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
