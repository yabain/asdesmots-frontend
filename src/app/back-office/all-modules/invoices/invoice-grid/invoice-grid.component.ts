import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-invoice-grid',
  templateUrl: './invoice-grid.component.html',
  styleUrls: ['./invoice-grid.component.css']
})
export class InvoiceGridComponent implements OnInit {

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
