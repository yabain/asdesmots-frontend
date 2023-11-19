import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Event, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllModulesService } from 'src/app/shared/services/all-modules.service';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-edit-expenses',
  templateUrl: './edit-expenses.component.html',
  styleUrls: ['./edit-expenses.component.css']
})
export class EditExpensesComponent implements OnInit {
  public id:any
  public allExpenses:any
  public editId: any;
  lstEstimates!: any[];
  public url: any = "expenses";
  public editExpensesForm!: FormGroup;
  public pipe = new DatePipe("en-US");
  constructor(private allModulesService: AllModulesService,private formBuilder: FormBuilder,private route: ActivatedRoute,private toastr: ToastrService,private router: Router,) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.queryParams["id"]);
    this.getExpenses();
    this.editExpensesForm = this.formBuilder.group({
      expensesCategory: ["", [Validators.required]],
      expensesNote: ["", [Validators.required]],
      expensesDate: ["", [Validators.required]],
      expensesCustomer: ["", [Validators.required]],
      expensesAmount: ["", [Validators.required]],
      status:[""],
    });
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control:any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  getExpenses() {
    this.allModulesService.get("expenses").subscribe((res) => {
      this.allExpenses = res;
      //passing edit id

      this.edit(this.id);
    });
  }
  editExpenses() {
    if (this.editExpensesForm.valid) {
      const jDate = new Date(this.editExpensesForm.value.expensesDate.year, this.editExpensesForm.value.expensesDate.month - 1, this.editExpensesForm.value.expensesDate.day);
      let DateJoin = this.pipe.transform(jDate,"dd-MM-yyyy");
      let obj = {
        category: this.editExpensesForm.value.expensesCategory,
        customer_name: this.editExpensesForm.value.expensesCustomer,
        notes: this.editExpensesForm.value.expensesNote,
        expense_date: DateJoin,
        status: this.editExpensesForm.value.status,
        amount: this.editExpensesForm.value.expensesAmount,
        id: this.editId,
      };
      this.allModulesService.update(obj, this.url).subscribe((data1) => {
      });
      this.toastr.success("", "Edited successfully!");
      this.router.navigate(["/expenses"]);
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }
  edit(value:any) {
    this.editId = value;
    const index = this.allExpenses.findIndex((item:any) => {
      return item.id === value;
    });
    let toSetValues = this.allExpenses[index];
    this.editExpensesForm.patchValue({
      expensesCategory: toSetValues.category,
      expensesNote: toSetValues.notes,
      expensesDate: toSetValues.expense_date,
      expensesCustomer: toSetValues.customer_name,
      expensesAmount: toSetValues.amount,
      status: toSetValues.status,
    });
  }
}
