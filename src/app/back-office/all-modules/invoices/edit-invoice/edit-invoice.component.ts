import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Event, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllModulesService } from 'src/app/shared/services/all-modules.service';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {
  public id:any
  public allInvoices:any
  public editId: any;
  lstEstimates!: any[];
  public url: any = "invoices";
  public editInvoiceForm!: FormGroup;
  public pipe = new DatePipe("en-US");
  select_box_open:any = []

  constructor(private allModulesService: AllModulesService,private formBuilder: FormBuilder,private route: ActivatedRoute,private toastr: ToastrService,private router: Router,) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.queryParams["id"]);
    this.getInvoice();
    this.editInvoiceForm = this.formBuilder.group({
      customerName: ["", [Validators.required]],
      estimateFrom: ["", [Validators.required]],
      estimateTo: ["", [Validators.required]],
      estimateNumber: ["", [Validators.required]],
      customerRef: ["", [Validators.required]],
      status:[""],
      amount:[""]
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
  getInvoice() {
    this.allModulesService.get("invoices").subscribe((res) => {
      this.allInvoices = res;
      //passing edit id

      this.edit(this.id);
    });
  }
  editInvoice() {
    if (this.editInvoiceForm.valid) {
      const jDate = new Date(this.editInvoiceForm.value.estimateFrom.year, this.editInvoiceForm.value.estimateFrom.month - 1, this.editInvoiceForm.value.estimateFrom.day);
      const eDate = new Date(this.editInvoiceForm.value.estimateTo.year, this.editInvoiceForm.value.estimateTo.month - 1, this.editInvoiceForm.value.estimateTo.day);
      let DateJoin = this.pipe.transform(jDate,"dd-MM-yyyy");
      let DateExpiry = this.pipe.transform(eDate,"dd-MM-yyyy");
      let obj = {
        customer_name: this.editInvoiceForm.value.customerName,
        created_date: DateJoin,
        due_date: DateExpiry,
        paid_on: DateJoin,
        number: this.editInvoiceForm.value.estimateNumber,
        status: this.editInvoiceForm.value.status,
        amount: this.editInvoiceForm.value.amount,
        id: this.editId,
      };
      this.allModulesService.update(obj, this.url).subscribe((data1) => {
      });
      this.toastr.success("", "Edited successfully!");
      this.router.navigate(["/invoice-reports"]);
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }
  edit(value:any) {
    this.editId = value;
    const index = this.allInvoices.findIndex((item:any) => {
      return item.id === value;
    });
    let toSetValues = this.allInvoices[index];
    this.editInvoiceForm.patchValue({
      customerName: toSetValues.customer_name,
      estimateFrom: toSetValues.estimate_date,
      estimateTo: toSetValues.expiry_date,
      estimateNumber: toSetValues.number,
      customerRef: toSetValues.number,
      status: toSetValues.status,
      amount:toSetValues.amount
    });
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
