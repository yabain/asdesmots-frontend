import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
import { Event, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from 'src/app/shared/services/all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from "@angular/common";
declare const $: any;

@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.css']
})
export class AddAppComponent implements OnInit {
  public url: any = "apps";
  public addEstimateForm!: FormGroup;
  public pipe = new DatePipe("en-US");
  select_box_open:any = []

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
        number: this.addEstimateForm.value.estimateNumber,
        created_date : DateJoin,
        due_date : DateExpiry,
        paid_on: DateJoin,
        amount : "$100",
        status : "Paid",
      };
      this.allModulesService.add(obj, this.url).subscribe((data) => {

      });
      this.router.navigate(["/app-reports"]);
      this.toastr.success("app added sucessfully...!", "Success");
    }
  }
  ngAfterViewInit() {
    this.loadfeather("assets/plugins/icons/feather/feather.css")
  }
  loadfeather(js:any) {
    var script = document.createElement('link');
    script.href = js;
    script.rel = "stylesheet"
    document.head.appendChild(script);
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
