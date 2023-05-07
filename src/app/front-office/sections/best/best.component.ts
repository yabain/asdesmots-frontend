import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-best',
  templateUrl: './best.component.html',
  styleUrls: ['./best.component.css'],
})
export class BestComponent implements OnInit {
  textDir: String = 'ltr';
  
  constructor(
    ) {
  }

  ngOnInit() {
  }
}
