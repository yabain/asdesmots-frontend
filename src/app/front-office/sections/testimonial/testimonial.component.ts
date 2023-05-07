import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
  textDir: String = 'ltr';
  
  constructor(
    ) {
  }

  ngOnInit() {
  }
}
