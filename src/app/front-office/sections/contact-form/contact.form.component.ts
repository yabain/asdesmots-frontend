import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact.form.component.html',
  styleUrls: ['./contact.form.component.css'],
})
export class FontactFormComponent implements OnInit {
  textDir: String = 'ltr';
  
  constructor(
    ) {
  }

  ngOnInit() {
  }
}
