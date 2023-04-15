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
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {
  public url: any = "expenses";
  public addExpensesForm!: FormGroup;
  public pipe = new DatePipe("en-US");
  constructor(public router: Router, location: Location, private allModulesService: AllModulesService,private formBuilder: FormBuilder,private route: ActivatedRoute,private toastr: ToastrService) {
  }

  ngOnInit() {

    this.addExpensesForm = this.formBuilder.group({
      expensesCategory: ["", [Validators.required]],
      expensesNote: ["", [Validators.required]],
      expensesDate: ["", [Validators.required]],
      expensesCustomer: ["", [Validators.required]],
      expensesAmount: ["", [Validators.required]],
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
  addExpenses() {
    if(this.addExpensesForm.invalid){
      this.markFormGroupTouched(this.addExpensesForm)
      return
    }
    else{
      const jDate = new Date(this.addExpensesForm.value.expensesDate.year, this.addExpensesForm.value.expensesDate.month - 1, this.addExpensesForm.value.expensesDate.day);
      let DateJoin = this.pipe.transform(jDate,"dd-MM-yyyy");
      let obj = {
        customer_name : this.addExpensesForm.value.expensesCustomer,
        expense_date : DateJoin,
        notes : this.addExpensesForm.value.expensesNote,
        number: this.addExpensesForm.value.estimateNumber,
        category: this.addExpensesForm.value.expensesCategory,
        amount : this.addExpensesForm.value.expensesAmount,
        status : "Approved",
      };
      this.allModulesService.add(obj, this.url).subscribe((data) => {

      });
      this.router.navigate(["/expenses"]);
      this.toastr.success("Expenses added sucessfully...!", "Success");
    }
  }
}
