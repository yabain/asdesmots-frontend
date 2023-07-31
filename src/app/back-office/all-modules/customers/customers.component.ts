import { Component, OnInit, ViewChild } from '@angular/core';
import { AllModulesService } from 'src/app/services/all-modules.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {

  constructor(private srvModuleService: AllModulesService) {}

  ngOnInit(): void {
    this.scrollToTop();

  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  
}
