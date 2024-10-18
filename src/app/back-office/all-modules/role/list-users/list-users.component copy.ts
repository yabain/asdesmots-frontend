import { Component, HostListener, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Sort } from '@angular/material/sort';
import { User } from 'src/app/shared/entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Location } from '@angular/common';
import { Role } from '../service/role.model';
import { log } from 'console';
import { pageSelection, PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component( {
       selector: 'app-list-users',
       templateUrl: './list-users.component.html',
       styleUrls: [ './list-users.component.css' ]
} )
export class ListUsersComponent implements OnInit
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




       public totalData = 0;
       // public routes = routes;
       public pageSize = 10;
       dataSource!: MatTableDataSource<any>;
       private pagination: PaginationService;

       public serialNumberArray: Array<number> = [];


       constructor (
              // private router: Router,

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

              // this.pagination.tablePageSize.subscribe( ( res: tablePageSize ) =>
              // {
              // Remplacer dans le code original
              // if ( this.isUsersListPage() )
              // {
              // this.getTableData( { skip: res.skip, limit: res.limit } );
              // this.pageSize = res.pageSize;
              // }
              // } );

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





       // private isUsersListPage(): boolean
       // {
       // 	// return this.router.url.includes( '/role/addrole/users' );
       // }














       loadUsers()
       {
              console.log( 'Chargement des utilisateurs...' ); // Log pour vérifier si la méthode est appelée
              this.customers = localStorage.getItem( 'users-list' );
              if ( this.customers )
              {
                     this.customers = JSON.parse( this.customers );
                     this.wating = false;
                     console.log( 'Utilisateurs chargés depuis le stockage local:', this.customers );
              } else
              {
                     console.log( 'Aucun utilisateur trouvé dans le stockage local, appel à getAllUsers()...' ); // Log pour suivre l'appel du service
                     this.userService.getAllUsers()
                            .then( ( result ) =>
                            {
                                   this.customers = JSON.parse( localStorage.getItem( 'users-list' ) );
                                   this.wating = true;
                                   console.log( 'Utilisateurs chargés depuis le service:', this.customers ); // Log pour vérifier le résultat
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
              console.log( 'user select', user )

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
              this.roleService.addRoleOnUser( { userId: userId, roleId: listRoleId } ).subscribe(
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







       getRoleNameById( roleId: string, type: string ): string
       {

              const role = this.roleService.listRole.find( role => role._id === roleId );

              if ( type === 'name' )
              {
                     return role ? role.name : 'Role not found';
              }

              if ( type === 'description' )
              {
                     return role ? role.description : 'Role not found';

              }
       }
















       public sortData( sort: Sort )
       {
              const data = this.customers.slice();

              if ( !sort.active || sort.direction === '' )
              {
                     this.customers = data;
              } else
              {
                     this.customers = data.sort( ( a, b ) =>
                     {
                            const aValue = ( a as never )[ sort.active ];
                            const bValue = ( b as never )[ sort.active ];
                            return ( aValue < bValue ? -1 : 1 ) * ( sort.direction === 'asc' ? 1 : -1 );
                     } );
              }
       }






       private getTableData( pageOption: pageSelection ): void
       {
              this.customers = localStorage.getItem( 'users-list' );

              if ( this.customers )
              {
                     this.customers = JSON.parse( this.customers );
                     this.serialNumberArray = [];
                     this.totalData = this.customers.length;

                     // Gérer la pagination locale
                     this.customers.slice( pageOption.skip, pageOption.skip + pageOption.limit ).map( ( user: User, index: number ) =>
                     {
                            const serialNumber = index + 1 + pageOption.skip;
                            user.id = serialNumber.toString();
                            this.serialNumberArray.push( serialNumber );
                     } );

                     this.dataSource = new MatTableDataSource<User>( this.customers );

                     this.pagination.calculatePageSize.next( {
                            totalData: this.totalData,
                            pageSize: this.pageSize,
                            tableData: this.customers,
                            tableData2: [],
                            serialNumberArray: this.serialNumberArray,
                     } );

                     this.wating = false;
              } else
              {
                     this.userService.getAllUsers()
                            .then( ( result ) =>
                            {
                                   this.customers = JSON.parse( localStorage.getItem( 'users-list' ) || '[]' );
                                   this.serialNumberArray = [];
                                   this.totalData = this.customers.length;

                                   this.customers.slice( pageOption.skip, pageOption.skip + pageOption.limit ).map( ( user: User, index: number ) =>
                                   {
                                          const serialNumber = index + 1 + pageOption.skip;
                                          user.id = serialNumber.toString();
                                          this.serialNumberArray.push( serialNumber );
                                   } );

                                   this.dataSource = new MatTableDataSource<User>( this.customers );

                                   this.pagination.calculatePageSize.next( {
                                          totalData: this.totalData,
                                          pageSize: this.pageSize,
                                          tableData: this.customers,
                                          tableData2: [],
                                          serialNumberArray: this.serialNumberArray,
                                   } );

                                   this.wating = false;
                            } )
                            .catch( ( error ) =>
                            {
                                   this.toastr.error( error.message, '', { timeOut: 7000 } );
                                   this.wating = false;
                            } );
              }
       }


}
