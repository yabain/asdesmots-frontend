import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import { Role } from './role.model';
import { EndpointRole } from './Endpoint';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/entities/user';
import { Permission } from 'src/app/shared/entities/permission';
import { UserService } from 'src/app/shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  listRole: Role[] = [];
  listPermission: Permission[] = [];
  waitinPermissionResp: boolean = false;
  roleAdded: boolean = false;

  listUsers: User[] = [];
  formCreateRole: FormGroup;
  creationDone: boolean = false;

  formAddPermission: FormGroup;

  updateForm: FormGroup;
  updateDone: boolean = false;
  newRole: Role = new Role();
  roleToUpdate : Role = new Role();

  authorisation : any;

  permissionAdded: boolean = false;
  waitingResponse: boolean = false;
  waitingResponseUser: boolean = false;
  deleteDone: boolean = false;
  removeDone: boolean = false;

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
   get formUpdating(){
      return this.updateForm.controls;
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

  initFormUpdate(){
      this.updateForm = this.fb.group({
          id: [''],
          name: ['', Validators.required],
          description: ['', Validators.required]
      });

      this.updateForm.valueChanges.subscribe((data)=>{
          Object.assign(this.roleToUpdate, data);
      });


  }

  initUpdateForm(roleChoose: Role){
    this.updateForm.controls['id'].setValue(roleChoose._id);
    this.updateForm.controls['name'].setValue(roleChoose.name);
    this.updateForm.controls['description'].setValue(roleChoose.description);
  }

  initAddingForm(){
    this.formAddPermission = this.fb.group({
        idRole: ['', Validators.required],
        idPermission: ['', Validators.required]
    });
    this.formAddPermission.valueChanges.subscribe((data)=>{

    })
  }
  createRole(){
    this.waitingResponse = true;
    this.creationDone = false;
    this.api.post(EndpointRole.CREATE_ROLE, this.newRole, this.authorisation).subscribe((resp)=>{
        console.log('resp created role', resp);
        this.getListRole();
        this.waitingResponse = false;
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

  updateRole(){
      this.updateDone = false;
      this.waitingResponse = false;

    //  this.api.post();
    console.log('role to update', this.roleToUpdate);
  }

  deleteRole(role: Role){
      this.waitingResponse = true;
      this.deleteDone = false;
      this.api.delete(EndpointRole.DELETE_ROLE+role._id, {'Authorization': 'Bearer ' + this.api.getAccessToken(), 'body': role } ).subscribe((resp)=>{
            this.updateOnMaintList(role._id);
            this.toastr.success('Delete Success', 'Success', {timeOut: 7000});
           
            this.deleteDone = true;
            this.waitingResponse = false;
      }, (error)=>{
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

  updateOnMaintList(idRole: number){
      const index = this.listRole.findIndex((rol)=> rol._id == idRole);

      if(index != -1){
          this.listRole.splice(index, 1);
      }
  }

  getUsersByRoleId(idrole: string){
      this.waitingResponseUser = true;
      this.api.get(EndpointRole.GET_USERS_ROLE+idrole+'/'+'users', this.authorisation).subscribe((resp)=>{
          this.listUsers = Array.from(resp.data);
          this.waitingResponseUser = false;

      },(error: any)=>{
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        }else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
        this.waitingResponseUser = false;
      })
  }
  getListRole(){
      this.waitingResponse = true;
      this.listRole = [];
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
      this.waitinPermissionResp = true;
      this.listPermission = [];
      this.api.get(EndpointRole.GET_LIST_PERMISSION, this.authorisation).subscribe((data: any)=>{
            this.listPermission = Array.from(data.data);
            this.waitinPermissionResp = false;
      }, (error: any)=>{
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        }else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
      })
  }

  addPermissionOnRole(requestBody: {roleId: string, permissionId: string}){
      this.waitinPermissionResp  = true;
      this.permissionAdded = false;
      console.log('request adding ', requestBody);
      this.api.post(EndpointRole.ADD_PERMISSION_ROLE, requestBody, this.authorisation).subscribe((resp)=>{
         this.getListRole();
          this.toastr.success('Permission Added', 'SUCCESS', { timeOut : 7000}); 
          this.waitinPermissionResp = false;
          this.permissionAdded = true;

      }, (error: any)=>{
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        }else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
        this.waitinPermissionResp = false;
      })
  }

  addRoleOnUser(requestBody: {userId: string, roleId: string }){
      this.waitingResponse = true;
      this.roleAdded = false;
      this.api.post(EndpointRole.ADD_ROLE_ON_USER, requestBody, this.authorisation).subscribe((resp)=>{
          this.waitingResponse =false;
          this.roleAdded = true;
          this.toastr.success('Role Add', 'SUCCESS', {timeOut: 7000});
      }, (error: any)=>{
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        }else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
        this.waitingResponse =false;
        this.roleAdded = false;
      })
  }

  removeRole(requestBody: {roleId: string, userId: string}){
      this.waitingResponse = true;
      this.removeDone = false;
      this.api.delete(EndpointRole.REMOVE_ROLE, this.authorisation, requestBody).subscribe((resp)=>{
          this.removeDone = true;
          this.toastr.success('Remove Done', 'Success', {timeOut : 7000});
          this.waitingResponse = false;
      }, (error)=>{
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
  getNameOfRole(id: string): string{
      const index = this.listRole.findIndex((role)=> role._id === id);
      if(index != -1){
          return this.listRole[index].name;
      }
      return '';
  }

  getRoleData(id: string): Role{
    const index = this.listRole.findIndex((role)=> role._id === id);
    if(index != -1){
        return this.listRole[index];
    }
    return new Role();
  }

  removePermission(requestBody: {roleId: string, permissionId: string}){
      this.waitinPermissionResp = true;
      this.api.delete(EndpointRole.REMOVE_ROLE_PERMISSION, this.authorisation).subscribe((resp)=>{
        this.waitinPermissionResp = false;
        this.toastr.success('Remove Done', 'SUCCESS', {timeOut: 7000});
      }, (error: any)=>{
        if (error.status == 500) {
          this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
        } else if (error.status == 401) {
          this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
        }else {
          this.toastr.error(error.message, 'Error', { timeOut: 7000 });
        }
        this.waitinPermissionResp = false;
      });
  }

  getUserWithRole(){

  }

}



