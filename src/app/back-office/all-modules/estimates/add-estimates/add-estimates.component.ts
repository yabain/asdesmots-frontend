import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
import { Event, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from 'src/app/shared/services/all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from "@angular/common";
// import * as $ from 'jquery';
declare const $: any;

@Component({
  selector: 'app-add-estimates',
  templateUrl: './add-estimates.component.html',
  styleUrls: ['./add-estimates.component.css']
})
export class AddEstimatesComponent implements OnInit {
  public url: any = "estimates";
  page = 'Add Estimate';
  public addEstimateForm!: FormGroup;
  public pipe = new DatePipe("en-US");
  constructor(public router: Router, location: Location, private allModulesService: AllModulesService,private formBuilder: FormBuilder,private route: ActivatedRoute,private toastr: ToastrService) {
  }

  ngOnInit() {

    this.addEstimateForm = this.formBuilder.group({
      customerName: ["", [Validators.required]],
      estimateFrom: ["", [Validators.required]],
      estimateTo: ["", [Validators.required]],
      estimateNumber: ["", [Validators.required]],
      customerRef: ["", [Validators.required]],
    });
    // Datetimepicker

  if($('.datetimepicker').length > 0 ){
    $('.datetimepicker').datetimepicker({
      format: 'DD-MM-YYYY',
      icons: {
        up: "fas fa-angle-up",
        down: "fas fa-angle-down",
        next: 'fas fa-angle-right',
        previous: 'fas fa-angle-left'
      }
    });
  }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control:any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  addEstimate() {
    if(this.addEstimateForm.invalid){
      this.markFormGroupTouched(this.addEstimateForm)
      return
    }
    else{
      const jDate = new Date(this.addEstimateForm.value.estimateFrom.year, this.addEstimateForm.value.estimateFrom.month - 1, this.addEstimateForm.value.estimateFrom.day);
      const eDate = new Date(this.addEstimateForm.value.estimateTo.year, this.addEstimateForm.value.estimateTo.month - 1, this.addEstimateForm.value.estimateTo.day);
      let DateJoin = this.pipe.transform(jDate,"dd-MM-yyyy");
      let DateExpiry = this.pipe.transform(eDate,"dd-MM-yyyy");
      let obj = {
        customer_name : this.addEstimateForm.value.customerName,
        estimate_date : DateJoin,
        expiry_date : DateExpiry,
        number: this.addEstimateForm.value.estimateNumber,
        amount : "$100",
        status : "Accepted",
      };
      this.allModulesService.add(obj, this.url).subscribe((data) => {

      });
      this.router.navigate(["/estimates"]);
      this.toastr.success("Estimates added sucessfully...!", "Success");
    }
  }
  // deleteModal(template: TemplateRef<any>, special) {
  // }

}
