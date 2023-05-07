import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-recom-articles',
  templateUrl: './recom.articles.component.html',
  styleUrls: ['./recom.articles.component.css'],
})
export class RecomArticlesComponent implements OnInit {
  textDir: String = 'ltr';
  
  constructor(
    ) {
  }

  ngOnInit() {
  }
}
