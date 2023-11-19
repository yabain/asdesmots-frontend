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
  selector: 'app-add-payments',
  templateUrl: './add-payments.component.html',
  styleUrls: ['./add-payments.component.css']
})
export class AddPaymentsComponent implements OnInit {
  public url: any = "payments";
  public addPaymentForm!: FormGroup;
  public pipe = new DatePipe("en-US");
  constructor(public router: Router, location: Location, private allModulesService: AllModulesService,private formBuilder: FormBuilder,private route: ActivatedRoute,private toastr: ToastrService) {
  }

  ngOnInit() {

    this.addPaymentForm = this.formBuilder.group({
      paymentDate: ["", [Validators.required]],
      paymentCustomer: ["", [Validators.required]],
      paymentAddress: ["", [Validators.required]],
      paymentAmount: ["", [Validators.required]],
      paymentNumber: ["", [Validators.required]],
      paymentInvoice: ["", [Validators.required]],
      paymentMode: ["", [Validators.required]],
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
  addPayment() {
    if(this.addPaymentForm.invalid){
      this.markFormGroupTouched(this.addPaymentForm)
      return
    }
    else{
      const jDate = new Date(this.addPaymentForm.value.paymentDate.year, this.addPaymentForm.value.paymentDate.month - 1, this.addPaymentForm.value.paymentDate.day);
      let DateJoin = this.pipe.transform(jDate,"dd-MM-yyyy");
      let obj = {
        ref_id: this.addPaymentForm.value.paymentNumber,
        customer_name : this.addPaymentForm.value.paymentCustomer,
        date : DateJoin,
        amount : this.addPaymentForm.value.paymentAmount,
        payment_method : this.addPaymentForm.value.paymentMode,
      };
      this.allModulesService.add(obj, this.url).subscribe((data) => {

      });
      this.router.navigate(["/payments"]);
      this.toastr.success("Payments added sucessfully...!", "Success");
    }
  }

  // deleteModal(template: TemplateRef<any>, special) {
  // }

}
