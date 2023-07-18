import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import { Role } from './role.model';
import { EndpointRole } from './Endpoint';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  listRole: Role[] = [];
  formCreateRole: FormGroup;
  creationDone: boolean = false;

  newRole: Role = new Role();
  authorisation : any;

  waitingResponse: boolean = false;

  constructor(
        private api: ApiService,
        private fb: FormBuilder,
        private toastr: ToastrService,
  ) { 
      this.authorisation = {  'Authorization': 'Bearer ' + this.api.getAccessToken()   }
   }

   get formCreation(){
      return this.formCreateRole.controls;
   }

  initFormCreatingRole(){
      this.formCreateRole = this.fb.group({
          name: ['', Validators.required],
          description: ['', Validators.required]
      });

      this.formCreateRole.valueChanges.subscribe((data)=>{
          Object.assign(this.newRole, data);
      });
  }
  createRole(){
    this.waitingResponse = true;
    this.creationDone = false;
    this.api.post(EndpointRole.CREATE_ROLE, this.newRole, this.authorisation).subscribe((resp)=>{
        console.log('resp created role', resp);
        this.creationDone = true;
        this.toastr.success('Role Creation Done', 'Success', { timeOut: 5000 });
    }, (error: any)=>{
      if (error.status == 500) {
        this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
      } else if (error.status == 401) {
        this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
      }else {
        this.toastr.error(error.message, 'Error', { timeOut: 7000 });
      }
      this.waitingResponse = false;
    });

  }

  getListRole(){
      this.waitingResponse = true;

      this.api.get(EndpointRole.GET_LIST_ROLE, this.authorisation).subscribe((resp)=>{
          this.listRole = Array.from(resp.data);
          this.waitingResponse = false;
          console.log('list role', resp);
      },(error: any)=>{
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        }else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
        this.waitingResponse = false;
      });
  }

  getListPermission(){

  }

  getUserWithRole(){

  }
}
