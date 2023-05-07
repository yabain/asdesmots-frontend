import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css'],
})
export class AuthorityComponent implements OnInit {
  textDir: String = 'ltr';
  
  constructor(
    ) {
  }

  ngOnInit() {
  }
}
