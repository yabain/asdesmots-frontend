import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Event, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllModulesService } from 'src/app/shared/services/all-modules.service';
import { DatePipe } from "@angular/common";

declare const $: any;

@Component({
  selector: 'app-edit-estimate',
  templateUrl: './edit-estimate.component.html',
  styleUrls: ['./edit-estimate.component.css']
})
export class EditEstimateComponent implements OnInit {
  public id:any
  public allEstimates:any
  public editId: any;
  lstEstimates!: any[];
  public url: any = "estimates";
  public editEstimateForm!: FormGroup;
  public pipe = new DatePipe("en-US");
  constructor(private allModulesService: AllModulesService,private formBuilder: FormBuilder,private route: ActivatedRoute,private toastr: ToastrService,private router: Router,) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.queryParams["id"]);
    this.getEstimates();
    this.editEstimateForm = this.formBuilder.group({
      customerName: ["", [Validators.required]],
      estimateFrom: ["", [Validators.required]],
      estimateTo: ["", [Validators.required]],
      estimateNumber: ["", [Validators.required]],
      customerRef: ["", [Validators.required]],
      status:[""],
      amount:[""]
    });

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
  getEstimates(){
    this.allModulesService.get("estimates").subscribe((res) => {
      this.allEstimates = res;
      //passing edit id

      this.edit(this.id);
    });
  }
  editEstimate() {
    if (this.editEstimateForm.valid) {
      const jDate = new Date(this.editEstimateForm.value.estimateFrom.year, this.editEstimateForm.value.estimateFrom.month - 1, this.editEstimateForm.value.estimateFrom.day);
      const eDate = new Date(this.editEstimateForm.value.estimateTo.year, this.editEstimateForm.value.estimateTo.month - 1, this.editEstimateForm.value.estimateTo.day);
      let DateJoin = this.pipe.transform(jDate,"dd-MM-yyyy");
      let DateExpiry = this.pipe.transform(eDate,"dd-MM-yyyy");
      let obj = {
        customer_name: this.editEstimateForm.value.customerName,
        estimate_date: DateJoin,
        expiry_date: DateExpiry,
        number: this.editEstimateForm.value.estimateNumber,
        status: this.editEstimateForm.value.status,
        amount: this.editEstimateForm.value.amount,
        id: this.editId,
      };
      this.allModulesService.update(obj, this.url).subscribe((data1) => {
      });
      this.toastr.success("", "Edited successfully!");
      this.router.navigate(["/estimates"]);
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }
  edit(value:any) {
    this.editId = value;
    const index = this.allEstimates.findIndex((item:any) => {
      return item.id === value;
    });
    let toSetValues = this.allEstimates[index];
    this.editEstimateForm.patchValue({
      customerName: toSetValues.customer_name,
      estimateFrom: toSetValues.estimate_date,
      estimateTo: toSetValues.expiry_date,
      estimateNumber: toSetValues.number,
      customerRef: toSetValues.number,
      status: toSetValues.status,
      amount:toSetValues.amount
    });
  }
}
