import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Event, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllModulesService } from 'src/app/shared/services/all-modules.service';
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  public id:any
  public allCustomers:any
  public editId: any;
  lstCustomers!: any[];
  public url: any = "customers";
  public editCustomerForm!: FormGroup;
  constructor(private allModulesService: AllModulesService,private formBuilder: FormBuilder,private route: ActivatedRoute,private toastr: ToastrService,private router: Router,) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.queryParams["id"]);
    this.getCustomer();
    this.editCustomerForm = this.formBuilder.group({
      customerName: ["", [Validators.required]],
      customerEmail: ["", [Validators.required]],
      customerCurrency: ["", [Validators.required]],
      customerPrimaryContact: ["", [Validators.required]],
      customerPhone: ["", [Validators.required]],
      customerWebsite: ["", [Validators.required]],
      customerBillingName: ["", [Validators.required]],
      customerBillingState: ["", [Validators.required]],
      customerBillingAddress: ["", [Validators.required]],
      customerBillingCountry: ["", [Validators.required]],
      customerBillingCity: ["", [Validators.required]],
      customerBillingPhone: ["", [Validators.required]],
      customerBillingZip: ["", [Validators.required]],
      customerShippingName: ["", [Validators.required]],
      customerShippingState: ["", [Validators.required]],
      customerShippingAddress: ["", [Validators.required]],
      customerShippingCountry: ["", [Validators.required]],
      customerShippingCity: ["", [Validators.required]],
      customerShippingPhone: ["", [Validators.required]],
      customerShippingZip: ["", [Validators.required]],
      amount_due: [""],
      registered_on: [""],
      status: [""],
      role: [""],
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

  // get method for estimate
  getCustomer() {
    this.allModulesService.get("customers").subscribe((res) => {
      this.allCustomers = res;
      //passing edit id

      this.edit(this.id);
    });

}
editCustomer() {
  if (this.editCustomerForm.valid) {
    let obj = {
      name: this.editCustomerForm.value.customerName,
      email: this.editCustomerForm.value.customerEmail,
      phone: this.editCustomerForm.value.customerPrimaryContact,
      amount_due: this.editCustomerForm.value.amount_due,
      registered_on: this.editCustomerForm.value.registered_on,
      status: this.editCustomerForm.value.status,
      role: this.editCustomerForm.value.role,
      id: this.editId,
    };
    this.allModulesService.update(obj, this.url).subscribe((data1) => {
    });
    this.toastr.success("", "Edited successfully!");
    this.router.navigate(["/customers"]);
  } else {
    this.toastr.warning("Mandatory fields required", "");
  }
}
edit(value:any) {
  this.editId = value;
  const index = this.allCustomers.findIndex((item:any) => {
    return item.id === value;
  });
  let toSetValues = this.allCustomers[index];
  this.editCustomerForm.patchValue({
    customerName: toSetValues.name,
    customerEmail: toSetValues.email,
    customerCurrency: toSetValues.email,
    customerPrimaryContact: toSetValues.phone,
    customerPhone: '9547895650',
    customerWebsite: 'exapmle@mail.com',
    customerBillingName: toSetValues.name,
    customerBillingState: 'AL',
    customerBillingAddress: '5754 Airport Rd',
    customerBillingCountry: 'United States',
    customerBillingCity: 'Coosada',
    customerBillingPhone: '888-777-6655',
    customerBillingZip: '36020',
    customerShippingName: toSetValues.name,
    customerShippingState: 'AL',
    customerShippingAddress: '5754 Airport Rd',
    customerShippingCountry: 'United States',
    customerShippingCity: 'Coosada',
    customerShippingPhone: '888-777-6655',
    customerShippingZip: '36020',
    amount_due: toSetValues.amount_due,
    registered_on: toSetValues.registered_on,
    status: toSetValues.status,
    role: toSetValues.role,
  });
}
}
