import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModulesService } from 'src/app/shared/services/all-modules.service';

@Component({
  selector: 'app-estimates-list',
  templateUrl: './estimates-list.component.html',
  styleUrls: ['./estimates-list.component.css']
})
export class EstimatesListComponent implements OnInit {
  public estimates: any = [];
  errorMessage: any;
  url: any = "estimates";
  public tempId: any;

  constructor(private srvModuleService: AllModulesService) { }

  ngOnInit(): void {
    this.getEstimates();
  }

  getEstimates() {
    this.estimates = this.srvModuleService.estimates;
  //   this.srvModuleService.get(this.url).subscribe((res) => {
  //     this.estimates = res;
  //   },
  // );
  }
  deleteEstimates() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
        this.getEstimates();
    });
  }
}
