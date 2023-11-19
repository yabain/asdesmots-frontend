import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  AfterViewInit,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
  Params,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent implements OnInit {
  adminShow: boolean = true;
  constructor(
    @Inject(DOCUMENT) private document,
    public commonService: DataService,
    private route: ActivatedRoute,
    public Router: Router
  ) {
    Router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (
          event.url === '/admin/forgot-pass' ||
          event.url === '/admin/lock-screen' ||
          event.url === '/admin/login-form' ||
          event.url === '/admin/register' ||
          event.url === '/admin/error-first' ||
          event.url === '/admin/error-second'
        ) {
          this.adminShow = false;
        } else {
          this.adminShow = true;
        }
      }
    });
  }
  ngOnInit(): void {
  }
}
