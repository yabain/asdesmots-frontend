import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModulesService } from 'src/app/shared/services/all-modules.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public customers: any = [];
  errorMessage: any;
  public tempId: any;
  url: any = 'customers';

  constructor(private srvModuleService: AllModulesService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customers = this.srvModuleService.customers;
    // this.srvModuleService.get(this.url).subscribe((res) => {
    //     this.customers = res;
    //   },
    // );
  }

  filter() {}
  deleteCustomer() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.getCustomers();
    });
  }

}
