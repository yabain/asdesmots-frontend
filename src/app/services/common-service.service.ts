import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {

  messages:any =  '';
  SERVER_URL: string = 'http://localhost:8080/api/';
  message: BehaviorSubject<String>;
  constructor(public http: HttpClient) {
    this.message = new BehaviorSubject(this.messages);
  }

  nextmessage(data:any) {
    this.message.next(data);
  }


  // Kanakku services
  getCustomers() {
    return this.http.get(this.SERVER_URL + 'customers');
  }

  getEstimates() {
    return this.http.get(this.SERVER_URL + 'estimates');
  }

  getInvoices() {
    return this.http.get(this.SERVER_URL + 'invoices');
  }

  getPayments() {
    return this.http.get(this.SERVER_URL + 'payments');
  }

  getExpenses() {
    return this.http.get(this.SERVER_URL + 'expenses');
  }

 payments = [
    {
      id : 1,
      ref_id: '#158790',
      customer_name : "Leatha Bailey",
      customer_img : "assets/img/smartestlotto-user-profile.png",
      date : "Wed Sep 17 2020 09:41:48 GMT+0530 (India Standard Time)",
      amount : "$444",
      payment_method : "Visa 9632",
    },
    {
      id : 2,
      ref_id: '#248960',
      customer_name : "Joseph Collins",
      customer_img : "assets/img/smartestlotto-user-profile.png",
      date : "Wed Sep 12 2020 09:41:48 GMT+0530 (India Standard Time)",
      amount : "$657",
      payment_method : "Visa 1254",
    },
    {
      id : 3,
      ref_id: '#368230',
      customer_name : "Marie Canales",
      customer_img : "assets/img/smartestlotto-user-profile.png",
      date : "Wed Nov 17 2020 09:41:48 GMT+0530 (India Standard Time)",
      amount : "$717",
      payment_method : "Visa 4321",
    },
    {
      id : 4,
      ref_id: '#45268',
      customer_name : "Russell Copeland",
      customer_img : "assets/img/smartestlotto-user-profile.png",
      date : "Wed Oct 11 2020 09:41:48 GMT+0530 (India Standard Time)",
      amount : "$120",
      payment_method : "Visa 5689",
    },
    {
      id : 5,
      ref_id: '#542187',
      customer_name : "John Blair",
      customer_img : "assets/img/smartestlotto-user-profile.png",
      date : "Wed Oct 25 2020 09:41:48 GMT+0530 (India Standard Time)",
      amount : "$657",
      payment_method : "Visa 4523",
    },
    {
      id : 6,
      ref_id: '#635489',
      customer_name : "Karlene Chaidez",
      customer_img : "assets/img/smartestlotto-user-profile.png",
      date : "Wed Nov 1 2020 09:41:48 GMT+0530 (India Standard Time)",
      amount : "$698",
      payment_method : "Visa 8795",
    },
    {
      id : 7,
      ref_id: '#875642',
      customer_name : "Greg Lynch",
      customer_img : "assets/img/smartestlotto-user-profile.png",
      date : "Wed Oct 7 2020 09:41:48 GMT+0530 (India Standard Time)",
      amount : "$582",
      payment_method : "	Visa 3654",
    },
  ]
 customers = [
    {
        id : 1,
        name : "Brian Johnson",
        email : "brianjohnson@example.com",
        phone : "9876543210",
        img : "assets/img/smartestlotto-user-profile.png",
        amount_due : "$8295",
        registered_on : "Wed Nov 16 2020 09:41:48 GMT+0530 (India Standard Time)",
        status : "Active",
        role: "Customer"
    },
    {
        id : 2,
        name : "Marie Canales",
        email : "mariecanales@example.com",
        phone : "9876543210",
        img : "assets/img/smartestlotto-user-profile.png",
        amount_due : "$1750",
        registered_on : "Wed May 08 2020 09:41:48 GMT+0530 (India Standard Time)",
        status : "Inactive",
        role: "Customer"
    },
    {
        id : 3,
        name : "Barbara Moore",
        email : "barbaramoore@example.com",
        phone : "9876543210",
        img : "assets/img/smartestlotto-user-profile.png",
        amount_due : "$8295",
        registered_on : "Wed Oct 24 2020 09:41:48 GMT+0530 (India Standard Time)",
        status : "Active",
        role: "Admin"
    },
    {
        id : 4,
        name : "Greg Lynch",
        email : "greglynch@example.com",
        phone : "9876543210",
        img : "assets/img/smartestlotto-user-profile.png",
        amount_due : "$3000",
        registered_on : "Wed Oct 11 2020 09:41:48 GMT+0530 (India Standard Time)",
        status : "Inctive",
        role: "Customer"
    },
    {
        id: 5,
        name : "Karlene Chaidez",
        email : "karlenechaidez@example.com",
        phone : "9876543210",
        img : "assets/img/smartestlotto-user-profile.png",
        amount_due : "-",
        registered_on : "Wed Sep 29 2020 09:41:48 GMT+0530 (India Standard Time)",
        status : "Inctive",
        role: "Admin"
    },
    {
        id: 6,
        name : "John Blair",
        email : "johnblair@example.com",
        phone : "9876543210",
        img : "assets/img/smartestlotto-user-profile.png",
        amount_due : "$50",
        registered_on : "Wed Aug 13 2020 09:41:48 GMT+0530 (India Standard Time)",
        status : "Active",
        role: "Customer"
    },
    {
        id: 7,
        name : "Russell Copeland",
        email : "russellcopeland@example.com",
        phone : "9876543210",
        img : "assets/img/smartestlotto-user-profile.png",
        amount_due : "-",
        registered_on : "Wed Jul 02 2020 09:41:48 GMT+0530 (India Standard Time)",
        status : "Inctive",
        role: "Customer"
    },
     {
        id: 8,
        name : "Leatha Bailey ",
        email : "leathabailey@example.com",
        phone : "9876543210",
        img : "assets/img/smartestlotto-user-profile.png",
        amount_due : "$480",
        registered_on : "Wed Sep 29 2020 09:41:48 GMT+0530 (India Standard Time)",
        status : "Active",
        role: "Customer"
    },
    {
        id: 9,
        name : "Joseph Collins",
        email : "josephcollins@example.com",
        phone : "9876543210",
        img : "assets/img/smartestlotto-user-profile.png",
        amount_due : "$600",
        registered_on : "Wed May 16 2020 09:41:48 GMT+0530 (India Standard Time)",
        status : "Active",
        role: "Customer"
    },
    {
        id: 10,
        name : "Jennifer Floyd",
        email : "jenniferfloyd@example.com",
        phone : "9876543210",
        img : "assets/img/smartestlotto-user-profile.png",
        amount_due : "-",
        registered_on : "Wed Sep 17 2020 09:41:48 GMT+0530 (India Standard Time)",
        status : "Active",
        role: "Admin"
    },
    {
        id: 11,
        name : "Alex Campbell",
        email : "alexcampbell@example.com",
        phone : "9876543210",
        img : "assets/img/smartestlotto-user-profile.png",
        amount_due : "-",
        registered_on : "Wed Mar 30 2020 09:41:48 GMT+0530 (India Standard Time)",
        status : "Active",
        role: "Customer"
    },
    {
        id: 12,
        name : "Wendell Ward",
        email : "wendellward@example.com",
        phone : "9876543210",
        img : "assets/img/profiles/avatar-13.jpg",
        amount_due : "$7500",
        registered_on : "Wed Mar 22 2020 09:41:48 GMT+0530 (India Standard Time)",
        status : "Active",
        role: "Admin"
    }
]
}
