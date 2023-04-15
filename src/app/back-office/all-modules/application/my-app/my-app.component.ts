import { Component, OnInit, ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.css']
})
export class MyAppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     // Checkbox Select

	$('.app-listing .selectBox').on("click", function() {
    $(this).parent().find('.checkBoxes').fadeToggle();
    $(this).parent().parent().siblings().find('.checkBoxes').fadeOut();
});

$('.invoices-main-form .selectBox').on("click", function() {
    $(this).parent().find('#checkBoxes-one').fadeToggle();
    $(this).parent().parent().siblings().find('#checkBoxes-one').fadeOut();
});
  }
  ngAfterViewInit() {
    Feather.replace();
  }
}
