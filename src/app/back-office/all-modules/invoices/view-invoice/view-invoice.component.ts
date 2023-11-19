import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css'],
})
export class ViewInvoiceComponent implements OnInit {
  invoices: any = [];
  errorMessage: any;
  dtOptions: any = {};

  constructor(
    public commonService: CommonServiceService
  ) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this.commonService.getInvoices().subscribe(
      (res) => {
        this.invoices = res;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }
}
