import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css'],
})
export class SalesreportComponent implements OnInit {
 
  errorMessage: any;
  constructor(public commonService: CommonServiceService) {}

  ngOnInit(): void {
    
  }
}
