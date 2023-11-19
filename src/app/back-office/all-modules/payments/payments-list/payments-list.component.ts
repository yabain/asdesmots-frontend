import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css']
})
export class PaymentsListComponent implements OnInit {
  payments: any = [];
  errorMessage: any;

  constructor(public commonService: CommonServiceService) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments() {

    this.payments = this.commonService.payments
    // this.commonService.getPayments().subscribe(
    //   (res) => {
    //     this.payments = res;
    //   },
    //   (error) => (this.errorMessage = <any>error)
    // );
  }

}
