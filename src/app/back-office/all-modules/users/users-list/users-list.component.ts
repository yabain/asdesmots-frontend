import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  customers: any = [];
  errorMessage: any;

  constructor(public commonService: CommonServiceService) { }

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers() {
    this.customers = this.commonService.customers
    // this.commonService.getCustomers().subscribe(
    //   (res) => {
    //     this.customers = res;
    //   },
    //   (error) => (this.errorMessage = <any>error)
    // );
  }
}
