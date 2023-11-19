import { Component, OnInit, ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { Subject } from 'rxjs';
declare const $: any;

@Component({
  selector: 'app-invoices-recurring',
  templateUrl: './invoices-recurring.component.html',
  styleUrls: ['./invoices-recurring.component.css']
})
export class InvoicesRecurringComponent implements OnInit {
  select_box_open:any = []

  constructor() { }

  ngOnInit(): void {

    // Checkbox Select

	$('.app-listing .selectBox').on("click", function(this:any) {
    $(this).parent().find('.checkBoxes').fadeToggle();
    $(this).parent().parent().siblings().find('.checkBoxes').fadeOut();
});

$('.invoices-main-form .selectBox').on("click", function(this:any) {
    $(this).parent().find('#checkBoxes-one').fadeToggle();
    $(this).parent().parent().siblings().find('#checkBoxes-one').fadeOut();
});
  }
  ngAfterViewInit() {
    Feather.replace();
  }
  public delete(){
    $('#delete_paid').modal('hide');
  }

  // Checkbox Select

  public openBox(val: any): void {

    if (this.select_box_open[0] != val) {
      this.select_box_open[0] = val;
      ;
    } else {
      this.select_box_open = []
    }
  }
}
