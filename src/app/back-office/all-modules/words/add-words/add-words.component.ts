import { Component, OnInit, TemplateRef } from '@angular/core';
// import { CommonServiceService } from 'src/app/services/common-service.service';
import { Event, Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from 'src/app/services/all-modules.service';
import { DatePipe } from "@angular/common";
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.css']
})
export class AddWordsComponent implements OnInit {
  public id:any
  public url: any = "customers";
  page = 'Add Customer';
  public pipe = new DatePipe("en-US");
  myDate = new Date();
  public addCustomerForm!: FormGroup;
  constructor(public router: Router,
    location: Location,
    private allModulesService: AllModulesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService,
    private translationService: TranslationService) {
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.translate.use(this.translationService.getLanguage());
  this.scrollToTop();

    this.addCustomerForm = this.formBuilder.group({
      customerName: ["", [Validators.required]],
      customerEmail: ["", [Validators.required]],
      customerCurrency: ["", [Validators.required]],
      customerPrimaryContact: ["", [Validators.required]],
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
  addWords() {
    if(this.addCustomerForm.invalid){
      this.markFormGroupTouched(this.addCustomerForm)
      return
    }
    else {

    let DateJoin = this.pipe.transform(
      this.myDate,"dd-MM-yyyy"
    );
    let obj = {
      name : this.addCustomerForm.value.customerName,
      email : this.addCustomerForm.value.customerEmail,
      phone : this.addCustomerForm.value.customerPrimaryContact,
      amount_due : "$8295",
      registered_on : DateJoin,
      status : "Active",
      role: "Customer"
    };
    this.allModulesService.add(obj, this.url).subscribe((data) => {

    });
    this.router.navigate(["/words-list"]);
    this.toastr.success("Words added sucessfully...!", "Success");
    }
  }

}
