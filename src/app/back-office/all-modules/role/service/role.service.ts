import { EventEmitter, Injectable, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import { Role } from './role.model';
import { EndpointRole } from './Endpoint';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/entities/user';
import { Permission } from 'src/app/shared/entities/permission';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorsService } from 'src/app/shared/services/errors/errors.service';

@Injectable( {
       providedIn: 'root',
} )
export class RoleService
{
       listRole: Role[] = [];
       listPermission: Permission[] = [];
       listRoleOfUser: any[] = [];

       waitinPermissionResp: boolean = false;
       roleAdded: boolean = false;
       hideModal: boolean = false;
       loadings: boolean = false;
       showModale: boolean = true;
       modalVisible: boolean = true;

       listUsers: User[] = [];
       formCreateRole: FormGroup;
       creationDone: boolean = false;
       checkboxChecked: boolean = false;
       loader: boolean = false;
       loading: boolean = false;
       isSaveButtonDisabled: boolean = true;
       isSaveButtonIsDisabled: boolean = true;

       formAddPermission: FormGroup;

       updateForm: FormGroup;
       updateDone: boolean = false;
       newRole: Role = new Role();
       roleToUpdate: Role = new Role();

       authorisation: any;

       permissionAdded: boolean = false;
       waitingResponse: boolean = false;
       waitingResponseUser: boolean = false;
       deleteDone: boolean = false;
       removeDone: boolean = false;

       constructor (
              private api: ApiService,
              private http: HttpClient,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private errorsService: ErrorsService,
              private languageService: TranslationService
       )
       {
              this.authorisation = {
                     Authorization: 'Bearer ' + this.api.getAccessToken(),
              };
       }

       get formCreation()
       {
              return this.formCreateRole.controls;
       }
       get formUpdating()
       {
              return this.updateForm.controls;
       }

       resetPermission()
       {
              this.listPermission.forEach( ( val ) =>
              {
                     val.isEnable = false;
              } );

              this.isSaveButtonDisabled = true;
       }

       resetRole()
       {
              this.listRole.forEach( ( val ) =>
              {
                     val.isEnable = false;
              } );
       }

       initFormCreatingRole()
       {
              this.formCreateRole = this.fb.group( {
                     name: [ '', Validators.required ],
                     description: [ '', Validators.required ],
              } );

              this.formCreateRole.valueChanges.subscribe( ( data ) =>
              {
                     Object.assign( this.newRole, data );
              } );
       }

       initFormUpdate()
       {
              this.updateForm = this.fb.group( {
                     id: [ '' ],
                     name: [ '', Validators.required ],
                     description: [ '', Validators.required ],
              } );

              this.updateForm.valueChanges.subscribe( ( data ) =>
              {
                     Object.assign( this.roleToUpdate, data );
              } );
       }

       initUpdateForm( roleChoose: Role )
       {
              this.updateForm.controls[ 'id' ].setValue( roleChoose._id );
              this.updateForm.controls[ 'name' ].setValue( roleChoose.name );
              this.updateForm.controls[ 'description' ].setValue( roleChoose.description );
       }

       initAddingForm()
       {
              this.formAddPermission = this.fb.group( {
                     idRole: [ '', Validators.required ],
                     idPermission: [ '', Validators.required ],
              } );
              this.formAddPermission.valueChanges.subscribe( ( data ) => { } );
       }

       createRole()
       {
              this.waitingResponse = true;
              this.creationDone = false;
              this.api
                     .post( EndpointRole.CREATE_ROLE, this.newRole, this.authorisation )
                     .subscribe(
                            ( resp ) =>
                            {
                                   console.log( 'resp created role', resp );
                                   this.getListRole();
                                   this.waitingResponse = false;
                                   this.creationDone = true;
                                   this.toastr.success( 'Role Creation Done', 'Success', {
                                          timeOut: 5000,
                                   } );
                            },
                            ( error: any ) =>
                            {
                                   if ( error.status == 500 )
                                   {
                                          this.toastr.error(
                                                 'Internal Server Error. Try again later please.',
                                                 'Error',
                                                 { timeOut: 10000 }
                                          );
                                   } else if ( error.status == 401 )
                                   {
                                          this.toastr.error( 'Invalid Token', 'error', { timeOut: 10000 } );
                                   } else
                                   {
                                          this.toastr.error( error.message, 'Error', { timeOut: 7000 } );
                                   }
                                   this.waitingResponse = false;
                            }
                     );
       }

       updateRole( roleId: any, roleData?: any )
       {
              return new Promise( ( resolve, reject ) =>
              {
                     let params = {
                            name: roleData.name,
                            description: roleData.description,
                     };
                     this.api
                            .put( EndpointRole.UPDATE_ROLE + `${ roleId }`, params, this.authorisation )
                            .subscribe(
                                   ( response: any ) =>
                                   {
                                          if ( response.statusCode === 200 )
                                          {
                                                 this.toastr.success(
                                                        'Role has been udapted successfully.',
                                                        'Success',
                                                        { timeOut: 7000 }
                                                 );
                                          }
                                          console.log( 'respose: ', response );
                                          resolve( response );
                                   },
                                   ( error: any ) =>
                                   {
                                          this.errorsService.errorsInformations( error, 'update role', '0' );
                                          reject( error );
                                   }
                            );
              } );
       }


       deleteRole( role: Role ): Observable<any>
       {
              return new Observable( ( observer ) =>
              {
                     this.waitingResponse = true;
                     this.deleteDone = false;

                     this.api.delete( EndpointRole.DELETE_ROLE + role._id, {
                            Authorization: 'Bearer ' + this.api.getAccessToken(),
                            body: role,
                     } ).subscribe(
                            ( resp ) =>
                            {
                                   this.updateOnMaintList( role._id );
                                   this.toastr.success( 'Delete Success', 'Success', { timeOut: 7000 } );
                                   this.deleteDone = false;
                                   this.waitingResponse = false;
                                   observer.next( resp );
                                   observer.complete();
                            },
                            ( error ) =>
                            {
                                   if ( error.status == 500 )
                                   {
                                          this.toastr.error( 'Internal Server Error. Try again later please.', 'Error', { timeOut: 10000 } );
                                   } else if ( error.status == 401 )
                                   {
                                          this.toastr.error( 'Invalid Token', 'error', { timeOut: 10000 } );
                                   } else
                                   {
                                          this.toastr.error( error.message, 'Error', { timeOut: 7000 } );
                                   }
                                   this.waitingResponse = false;
                                   observer.error( error );
                            }
                     );
              } );
       }

       updateOnMaintList( idRole: number )
       {
              const index = this.listRole.findIndex( ( rol ) => rol._id == idRole );

              if ( index != -1 )
              {
                     this.listRole.splice( index, 1 );
              }
       }

       getUsersByRoleId( idrole: string )
       {
              this.waitingResponseUser = true;
              this.api
                     .get(
                            EndpointRole.GET_USERS_ROLE + idrole + '/' + 'users',
                            this.authorisation
                     )
                     .subscribe(
                            ( resp ) =>
                            {
                                   this.listUsers = Array.from( resp.data );
                                   this.waitingResponseUser = false;
                            },
                            ( error: any ) =>
                            {
                                   if ( error.status == 500 )
                                   {
                                          this.toastr.error(
                                                 'Internal Server Error. Try again later please.',
                                                 'Error',
                                                 { timeOut: 10000 }
                                          );
                                   } else if ( error.status == 401 )
                                   {
                                          this.toastr.error( 'Invalid Token', 'error', { timeOut: 10000 } );
                                   } else
                                   {
                                          this.toastr.error( error.message, 'Error', { timeOut: 7000 } );
                                   }
                                   this.waitingResponseUser = false;
                            }
                     );
       }

       getListRole()
       {
              this.waitingResponse = true;
              this.listRole = [];
              this.api.get( EndpointRole.GET_LIST_ROLE, this.authorisation ).subscribe(
                     ( resp ) =>
                     {
                            this.listRole = Array.from( resp.data );
                            this.waitingResponse = false;
                            console.log( 'list role', resp );
                     },
                     ( error: any ) =>
                     {
                            if ( error.status == 500 )
                            {
                                   this.toastr.error(
                                          'Internal Server Error. Try again later please.',
                                          'Error',
                                          { timeOut: 10000 }
                                   );
                            } else if ( error.status == 401 )
                            {
                                   this.toastr.error( 'Invalid Token', 'error', { timeOut: 10000 } );
                            } else
                            {
                                   this.toastr.error( error.message, 'Error', { timeOut: 7000 } );
                            }
                            this.waitingResponse = false;
                     }
              );
       }

       getListPermission()
       {
              this.waitinPermissionResp = true;
              this.listPermission = [];
              this.api
                     .get( EndpointRole.GET_LIST_PERMISSION, this.authorisation )
                     .subscribe(
                            ( data: any ) =>
                            {
                                   this.listPermission = Array.from( data.data );
                                   this.waitinPermissionResp = false;
                            },
                            ( error: any ) =>
                            {
                                   if ( error.status == 500 )
                                   {
                                          this.toastr.error(
                                                 'Internal Server Error. Try again later please.',
                                                 'Error',
                                                 { timeOut: 10000 }
                                          );
                                   } else if ( error.status == 401 )
                                   {
                                          this.toastr.error( 'Invalid Token', 'error', { timeOut: 10000 } );
                                   } else
                                   {
                                          this.toastr.error( error.message, 'Error', { timeOut: 7000 } );
                                   }
                            }
                     );
       }

       addPermissionOnRole( requestBody: { roleId: string; permissionId: string[] } )
       {
              this.checkboxChecked = false;
              this.loader = true;
              console.log( 'request adding ', requestBody );
              this.api
                     .post( EndpointRole.ADD_PERMISSION_ROLE, requestBody, this.authorisation )
                     .subscribe(
                            ( resp ) =>
                            {
                                   this.getListRole();
                                   this.toastr.success( 'Permission Added', 'SUCCESS', { timeOut: 7000 } );
                                   this.loader = false;
                            },
                            ( error: any ) =>
                            {
                                   if ( error.status == 500 )
                                   {
                                          this.toastr.error(
                                                 this.languageService.transformMessageLanguage( 'internalError' ),
                                                 this.languageService.transformMessageLanguage( 'error' ),
                                                 { timeOut: 10000 }
                                          );
                                   } else if ( error.status == 401 )
                                   {
                                          this.toastr.error(
                                                 this.languageService.transformMessageLanguage( 'invalid token' ),
                                                 this.languageService.transformMessageLanguage( 'error' ),
                                                 { timeOut: 10000 }
                                          );
                                   } else if ( error.status == 400 )
                                   {
                                          this.toastr.error(
                                                 this.languageService.transformMessageLanguage(
                                                        'permissionId must contain at least 1 elements'
                                                 ),
                                                 this.languageService.transformMessageLanguage( 'error' ),
                                                 { timeOut: 10000 }
                                          );
                                   } else
                                   {
                                          this.toastr.error( error.message, 'Error', { timeOut: 7000 } );
                                   }
                                   this.loader = false;
                            }
                     );
       }

       // addRoleOnUser(requestBody: {userId: string, roleId: string }){
       //     this.api.post(EndpointRole.ADD_ROLE_ON_USER, requestBody, this.authorisation).subscribe((resp)=>{
       //         this.toastr.success('Role Add', 'SUCCESS', {timeOut: 7000});
       //     }, (error: any)=>{
       //       if (error.status == 500) {
       //         this.toastr.error("Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 });
       //       } else if (error.status == 401) {
       //         this.toastr.error("Invalid Token", 'error', { timeOut: 10000 });
       //       }else {
       //         this.toastr.error(error.message, 'Error', { timeOut: 7000 });
       //       }
       //     })
       // }

       // addRoleOnUser(requestBody: {
       //   userId: string;
       //   roleId: string[];
       // }): Observable<any> {
       //   return this.api.post(
       //     EndpointRole.ADD_ROLE_ON_USER,
       //     requestBody,
       //     this.authorisation
       //   );
       // }

       addRoleOnUser( requestBody: { userId: string, roleId: string } ): Observable<any>
       {
              return new Observable( ( observer ) =>
              {
                     this.api.post( EndpointRole.ADD_ROLE_ON_USER, requestBody, this.authorisation ).subscribe(
                            ( resp ) =>
                            {
                                   this.toastr.success( 'Role Add', 'SUCCESS', { timeOut: 7000 } );
                                   observer.next( resp );
                                   observer.complete();
                            },
                            ( error ) =>
                            {
                                   if ( error.status == 500 )
                                   {
                                          this.toastr.error( "Internal Server Error. Try again later please.", 'Error', { timeOut: 10000 } );
                                   } else if ( error.status == 401 )
                                   {
                                          this.toastr.error( "Invalid Token", 'error', { timeOut: 10000 } );
                                   } else
                                   {
                                          this.toastr.error( error.message, 'Error', { timeOut: 7000 } );
                                   }
                                   observer.error( error );
                            }
                     );
              } );
       }

       removeRole( roleId: string, userId: string ): Observable<any>
       {
              return new Observable( ( observer ) =>
              {
                     this.api
                            .delete(
                                   EndpointRole.REMOVE_ROLE + `/${ userId }/${ roleId }`,
                                   this.authorisation
                            )
                            .subscribe(
                                   ( resp ) =>
                                   {
                                          this.toastr.success( 'Remove Done', 'Success', { timeOut: 7000 } );
                                          observer.next( resp );
                                          observer.complete();
                                   },
                                   ( error ) =>
                                   {
                                          if ( error.status == 500 )
                                          {
                                                 this.toastr.error(
                                                        'Internal Server Error. Try again later please.',
                                                        'Error',
                                                        { timeOut: 10000 }
                                                 );
                                          } else if ( error.status == 401 )
                                          {
                                                 this.toastr.error( 'Invalid Token', 'error', { timeOut: 10000 } );
                                          } else
                                          {
                                                 this.toastr.error( error.message, 'Error', { timeOut: 7000 } );
                                          }
                                          console.error( error );
                                          observer.error( error );
                                   }
                            );
              } );
       }

       getNameOfRole( id: string ): string
       {
              const index = this.listRole.findIndex( ( role ) => role._id === id );
              if ( index != -1 )
              {
                     return this.listRole[ index ].name;
              }
              return '';
       }

       getRoleData( id: string ): Role
       {
              const index = this.listRole.findIndex( ( role ) => role._id === id );
              if ( index != -1 )
              {
                     return this.listRole[ index ];
              }
              return new Role();
       }

       removePermission( requestBody: { roleId: string; permissionId: string } )
       {
              this.waitinPermissionResp = true;
              this.api
                     .delete( EndpointRole.REMOVE_ROLE_PERMISSION, this.authorisation )
                     .subscribe(
                            ( resp ) =>
                            {
                                   this.waitinPermissionResp = false;
                                   this.toastr.success( 'Remove Done', 'SUCCESS', { timeOut: 7000 } );
                            },
                            ( error: any ) =>
                            {
                                   if ( error.status == 500 )
                                   {
                                          this.toastr.error(
                                                 'Internal Server Error. Try again later please.',
                                                 'Error',
                                                 { timeOut: 10000 }
                                          );
                                   } else if ( error.status == 401 )
                                   {
                                          this.toastr.error( 'Invalid Token', 'error', { timeOut: 10000 } );
                                   } else
                                   {
                                          this.toastr.error( error.message, 'Error', { timeOut: 7000 } );
                                   }
                                   this.waitinPermissionResp = false;
                            }
                     );
       }

       enablePermission( rolePermission: Permission[] ) { }

       async getListRoleByUserID( userID: string )
       {
              this.waitingResponse = true;
              this.listRoleOfUser = [];
              this.api
                     .get( EndpointRole.GET_ROLE_OF_USER + userID, this.authorisation )
                     .subscribe(
                            ( response ) =>
                            {
                                   this.waitingResponse = false;
                                   this.listRoleOfUser = response.data;
                                   console.log( typeof response.data );
                                   this.buildListCheckedRole();
                            },
                            ( error ) =>
                            {
                                   if ( error.status == 500 )
                                   {
                                          this.toastr.error(
                                                 'Internal Server Error. Try again later please.',
                                                 'Error',
                                                 { timeOut: 10000 }
                                          );
                                   } else if ( error.status == 401 )
                                   {
                                          this.toastr.error( 'Invalid Token', 'error', { timeOut: 10000 } );
                                   } else
                                   {
                                          this.toastr.error( error.message, 'Error', { timeOut: 7000 } );
                                   }
                                   this.waitingResponse = false;
                            }
                     );
       }

       buildListCheckedRole()
       {
              this.listRole.forEach( ( roleList, index ) =>
              {
                     const i = this.listRoleOfUser.findIndex(
                            ( value ) => value === roleList._id
                     );
                     if ( i != -1 )
                     {
                            this.listRole[ index ].isEnable = true;
                     }
              } );
       }

       resetListBuild()
       {
              this.listRole.map( ( role ) =>
              {
                     role.isEnable = false;
              } );
       }
}
