import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Location } from '@angular/common';
import { Role } from '../service/role.model';
import { log } from 'console';



@Component( {
       selector: 'app-list-user-old',
       templateUrl: './list-user-old.component.html',
       styleUrls: [ './list-user-old.component.css' ]
} )
export class ListUserOldComponent implements OnInit
{

       customers: any;
       wating: boolean = false;
       userData: User = new User();
       formAddRole: FormGroup;
       isAnyCheckboxChecked: boolean = false;
       roleData: Role = new Role();
       loader: boolean = false;
       isClosed: boolean = false;
       checkedRoles: string[] = [];

       constructor (
              private translate: TranslateService,
              private translationService: TranslationService,
              public roleService: RoleService,
              private userService: UserService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private location: Location

       )
       {
              this.translate.use( this.translationService.getCurrentLanguage() );
              this.initForm();
              this.loadUsers();
              this.initTranslation();
       }

       ngOnInit()
       {
              this.roleService.getListRole();
              // Récupérer les roles cochés depuis le stockage local
              const storedRoles = localStorage.getItem( 'checkedRoles' );
              if ( storedRoles )
              {
                     this.checkedRoles = JSON.parse( storedRoles );
              }

              // Vider le stockage local pour les permissions cochées
              localStorage.removeItem( 'checkedRoles' );
       }

       initTranslation()
       {
              this.translate.use( this.translationService.getCurrentLanguage() );
       }

       initForm()
       {
              this.formAddRole = this.fb.group( {
                     idRole: [ '', Validators.required ]
              } );
       }

       loadUsers()
       {
              this.customers = localStorage.getItem( 'users-list' );
              if ( this.customers )
              {
                     this.customers = JSON.parse( localStorage.getItem( 'users-list' ) );
                     this.wating = false;
                     console.log( 'infos a propos du users ', this.customers[ 0 ] );
              } else
              {
                     this.userService.getAllUsers()
                            .then( ( result ) =>
                            {
                                   this.customers = JSON.parse( localStorage.getItem( 'users-list' ) );
                                   this.wating = true;
                                   console.log( 'infos a propos du users ', this.customers[ 0 ] );

                                   setTimeout( () =>
                                   {
                                          this.wating = false;
                                   }, 3000 );
                            } )
                            .catch( ( error ) =>
                            {
                                   this.toastr.error( error.message, '', { timeOut: 7000 } );
                                   this.wating = false;
                            } );
              }
       }

       doAddRole()
       {
              console.log( 'data to add', { userId: this.userData._id, roleId: this.formAddRole.get( 'idRole' ).value } )
              this.roleService.addRoleOnUser( { userId: this.userData._id, roleId: this.formAddRole.get( 'idRole' ).value } );
       }

       refreshList()
       {
              this.loadUsers();
       }

       reset()
       {

       }

       buildListRoleChooseUser( user: User )
       {
              this.userData = user;
              this.roleService.getListRoleByUserID( user._id );
       }

       backClicked()
       {
              // Vider le stockage local pour les permissions cochées
              localStorage.removeItem( 'checkedRoles' );
              this.location.back();
              this.roleService.isSaveButtonIsDisabled = true;
       }


       updateCheckboxState( role: any )
       {
              // Mettre à jour l'état de la case à cocher
              role.isEnable = !role.isEnable;
              // Vérifier si au moins une case à cocher est cochée
              this.roleService.isSaveButtonIsDisabled = this.roleService.listRole.every( role => !role.isEnable );
              // Initialisation du tableau des permissions checkées
              if ( role.checked )
              {
                     this.checkedRoles.push( role._id );
                     // localStorage.setItem('checkedPermissions', JSON.stringify(this.checkedPermissions));
                     console.log( "roles checked: ", this.checkedRoles );
              } else
              {
                     const index = this.checkedRoles.indexOf( role._id );
                     if ( index !== -1 )
                     {
                            this.checkedRoles.splice( index, 1 );
                     }
              }
              // Mettre à jour le stockage local
              localStorage.setItem( 'checkedRoles', JSON.stringify( this.checkedRoles ) );

       }

       addRoleOnUser(): void
       {
              // Activer loader
              this.loader = true
              const listRoleId: string[] = this.checkedRoles;
              const userId = this.userData._id;
              this.roleService.addRoleOnUser( { userId: userId, roleId: listRoleId[ 0 ] } ).subscribe(
                     ( response ) =>
                     {
                            // Traitement de l'ajout de rôle réussi
                            this.loader = false;
                            const closeButton = document.getElementById( 'cancel-btn2' );
                            if ( closeButton )
                            {
                                   closeButton.click();
                            }
                     },
                     ( error ) =>
                     {
                            // Gestion des erreurs
                     }
              );

       }


       getUserRolePercentage( userRoles: number, totalRoles: number ): number
       {

              let ratio = ( userRoles / totalRoles ) * 100
              return ratio;

       }


       getRoleNameById( roleId: string ): string
       {

              const role = this.roleService.listRole.find( role => role._id === roleId );
              return role ? role.name : 'Role not found';
       }

}
