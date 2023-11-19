import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-view-estimate',
  templateUrl: './view-estimate.component.html',
  styleUrls: ['./view-estimate.component.css'],
})
export class ViewEstimateComponent implements OnInit {
  estimates: any = [];
  errorMessage: any;

  constructor(public commonService: CommonServiceService) {}

  ngOnInit(): void {
    this.getEstimates();
  }

  getEstimates() {
    this.commonService.getEstimates().subscribe(
      (res) => {
        this.estimates = res;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }
}
