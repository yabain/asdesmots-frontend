import { AfterContentChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RoleService } from '../service/role.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Sort } from '@angular/material/sort';
import { isEqual } from 'lodash';  // Si vous utilisez lodash pour une comparaison profonde

import { User } from 'src/app/shared/entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Location } from '@angular/common';
import { Role } from '../service/role.model';
import { pageSelection, PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';
import { MatTableDataSource } from '@angular/material/table';
import { log } from 'console';

declare var $: any; // Déclarez jQuery pour l'utiliser

@Component( {
       selector: 'app-list-users',
       templateUrl: './list-users.component.html',
       styleUrls: [ './list-users.component.css' ]
} )
export class ListUsersComponent implements OnInit, AfterContentChecked
{


       exec = true
       groupedUsers: any[] = [];
       customers: User[] = []; // Initialisation comme un tableau vide
       waiting: boolean = false;
       userData: User = new User();
       formAddRole: FormGroup;
       isAnyCheckboxChecked: boolean = false;
       roleData: Role = new Role();
       loader: boolean = false;
       isClosed: boolean = false;
       checkedRoles: string[] = [];


       idxHover = null
       idxRoleHover = null
       showElement = false
       dataIsloading = false
       dataIsLoaded = false
       showBackdrop = false
       sendTrFront = false


       isAddingRole = false
       showDropDown = true

       pageOption = {
              skip: 0, // Valeur de décalage
              limit: 12 // Limite d'entrées par page
       };
       public totalData = 0;
       public pageSize = 12;
       dataSource = new MatTableDataSource<any>();
       private pagination: PaginationService;

       public serialNumberArray: Array<number> = [];


       @ViewChild( '#roleDropdown', { static: true } ) boutonElement!: ElementRef;


       constructor (
              private translate: TranslateService,
              private translationService: TranslationService,
              public roleService: RoleService,
              private userService: UserService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private location: Location,
              private paginationService: PaginationService,// Ajout du service de pagination
              private renderer: Renderer2,
              private el: ElementRef,
       )
       {
              this.translate.use( this.translationService.getCurrentLanguage() );
              this.initForm();
              this.loadUsers();
              this.initTranslation();

              this.paginationService.tablePageSize.subscribe( ( res: tablePageSize ) =>
              {
                     this.getTableData( { skip: res.skip, limit: res.limit } );
                     this.pageSize = res.pageSize;
              } );
       }

       ngOnInit()
       {
              this.roleService.getListRole();
              const storedRoles = localStorage.getItem( 'checkedRoles' );
              if ( storedRoles )
              {
                     this.checkedRoles = JSON.parse( storedRoles );
              }
              localStorage.removeItem( 'checkedRoles' );
              // this.trierParRoles( this.dataSource.data )
       }


       ngAfterContentChecked(): void
       {


              // this.paginationService.updateTab()
              this.dataSource = new MatTableDataSource<User>( this.paginationService.tableauUSerToshow );

              // this.trierParRoles( this.dataSource.data )

       }




       trierParRoles( clients: any[] ): any[]
       {
              return clients.sort( ( a, b ) => b.roles.length - a.roles.length );
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


       doAddRole()
       {
              console.log( 'data to add', { userId: this.userData._id, roleId: this.formAddRole.get( 'idRole' )?.value } );
              this.roleService.addRoleOnUser( { userId: this.userData._id, roleId: this.formAddRole.get( 'idRole' )?.value } );
       }

       refreshList()
       {
              this.loadUsers();
       }

       reset() { }

       buildListRoleChooseUser( user: User )
       {
              this.userData = user;
              console.log( 'user select', user )

              this.roleService.getListRoleByUserID( user._id );
       }

       backClicked()
       {
              localStorage.removeItem( 'checkedRoles' );
              this.location.back();
              this.roleService.isSaveButtonIsDisabled = true;
       }



       triggerClick()
       {
              this.boutonElement.nativeElement.click();
       }




       onMouseEnter( customer: any, idxUser, idxRoleGet, roleLenght )
       {
              this.showElement = true
              this.idxHover = idxUser

              if ( roleLenght > 4 )
              {

                     this.showBackdrop = true
              }
       }



       onMouseRoleEnter( idxUser: number, idxRoleGet: number )
       {

              this.idxRoleHover = idxRoleGet
              this.idxHover = idxUser

              // console.log( 'permission hover' )
       }

       onMouseRoleBtnEnter( idxUser: number )
       {
              this.idxHover = idxUser
              this.showBackdrop = true
              console.log( 'send tr font setted to true' )
              console.log( 'idx user get', idxUser )
       }

       onMouseLeave( categorie )
       {
              if ( categorie === 'role' )
              {


                     this.idxRoleHover = null
                     // console.log( 'sortir effectuer' )

              }

              if ( categorie === 'user' )
              {


                     this.showElement = false
                     this.showBackdrop = false
                     // console.log( 'sortir effectuer' )

              }
       }
       // updateCheckboxState( role: any )
       // {
       //        role.isEnable = !role.isEnable;
       //        this.roleService.isSaveButtonIsDisabled = this.roleService.listRole.every( role => !role.isEnable );
       //        if ( role.checked )
       //        {
       //               this.checkedRoles.push( role._id );
       //               console.log( "roles pass: ", role );
       //               console.log( "roles checked: ", this.checkedRoles );
       //        } else
       //        {
       //               const index = this.checkedRoles.indexOf( role._id );
       //               if ( index !== -1 )
       //               {
       //                      this.checkedRoles.splice( index, 1 );
       //               }
       //        }
       //        localStorage.setItem( 'checkedRoles', JSON.stringify( this.checkedRoles ) );
       // }









       updateCheckboxState( role: any )
       {
              // Mettre à jour l'état de la case à cocher
              role.isEnable = !role.isEnable;

              // Vérifier si au moins une case à cocher est cochée
              this.roleService.isSaveButtonIsDisabled = this.roleService.listRole.every( role => !role.isEnable );

              // Initialisation du tableau des permissions checkées
              const index = this.checkedRoles.indexOf( role._id );

              if ( role.isEnable )
              {
                     // Si l'élément est coché et n'est pas déjà dans le tableau, on l'ajoute
                     if ( index === -1 )
                     {
                            this.checkedRoles.push( role._id );
                     }
              } else
              {
                     // Si l'élément est décoché, on le retire du tableau
                     if ( index !== -1 )
                     {
                            this.checkedRoles.splice( index, 1 );
                     }
              }

              // Mettre à jour le stockage local avec les éléments checkés actuels
              localStorage.setItem( 'checkedRoles', JSON.stringify( this.checkedRoles ) );

              // Log de vérification
              console.log( "roles checked: ", this.checkedRoles );
       }





       addRoleOnUser( userid: string ): void
       {
              this.isAddingRole = true;

              const listRoleId: string[] = this.checkedRoles; // Liste des rôles sélectionnés
              const userId = userid;

              // Créer un tableau de Promises
              const addRolePromises = listRoleId.map( ( roleId ) =>
              {
                     return this.roleService.addRoleOnUser( { userId: userId, roleId: roleId } ).toPromise() // Conversion en Promise
                            .then( () =>
                            {
                                   console.log( `Rôle ${ roleId } ajouté avec succès à l'utilisateur ${ userId }` );
                            } )
                            .catch( ( error ) =>
                            {
                                   console.error( `Erreur lors de l'ajout du rôle ${ roleId } à l'utilisateur ${ userId }`, error );
                            } );
              } );

              // Attendre que toutes les requêtes soient terminées
              Promise.all( addRolePromises ).then( () =>
              {
                     // Toutes les requêtes sont terminées
                     this.loadUsers(); // Recharge la liste des utilisateurs après l'ajout des rôles
                     this.isAddingRole = false; // Mettre à jour l'état après l'ajout des rôles
                     // this.closeDropdown(); // Fermer le dropdown même en cas d'erreur
                     this.showDropDown = false
                     this.showElement = false
                     this.showBackdrop = false
                     // this.triggerClick()




                     console.log( 'Tous les rôles ont été ajoutés avec succès' );
              } ).catch( ( error ) =>
              {
                     console.error( 'Erreur lors de l\'ajout de certains rôles', error );
                     this.isAddingRole = false;
              } );



       }






       // Méthode pour fermer le dropdown manuellement via JavaScript Bootstrap
       closeDropdown( shw ): void
       {
              if ( shw === 'true' )
              {

                     this.showDropDown = true

              } else
              {
                     this.showDropDown = false
              }
       }








       removeUserRole( userId: string, roleId: string ): void
       {
              console.log( 'id du role a suppromer recu depuis le parametre', roleId )
              this.loader = true;

              // Itérer sur chaque rôle et l'envoyer un par un

              this.roleService.removeRole( { userId: userId, roleId: roleId } ).subscribe(
                     ( response ) =>
                     {
                            // Vous pouvez ajouter une gestion des succès par rôle ici

                            this.loadUsers(); // Recharge la liste des utilisateurs après l'ajout des rôles
                            console.log( `Rôle ${ roleId } supprimer avec succès à l'utilisateur ${ userId }` );
                     },
                     ( error ) =>
                     {
                            // Gestion des erreurs pour chaque rôle
                            console.error( `Erreur lors de la suppression du rôle ${ roleId } à l'utilisateur ${ userId }` );
                     }
              );




       }







       showUserID( id: any )
       {
              console.log( 'valeur deeeeeeeee id du user', id )
       }
       getUserRolePercentage( userRoles: number, totalRoles: number ): number
       {
              let ratio = ( userRoles / totalRoles ) * 100;
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
                            const aValue = ( a as any )[ sort.active ];
                            const bValue = ( b as any )[ sort.active ];
                            return ( aValue < bValue ? -1 : 1 ) * ( sort.direction === 'asc' ? 1 : -1 );
                     } );
              }
       }


       applyFilter( event: Event )
       {
              const filterValue = ( event.target as HTMLInputElement ).value;
              this.dataSource.filter = filterValue.trim().toLowerCase();
       }







       Z







       loadUsers()
       {
              if ( !this.dataIsLoaded )
              {
                     this.dataIsloading = true
              }
              // this.waiting = true; // Début du chargement
              console.log( 'loader user appelé' );
              const storedCustomers = localStorage.getItem( 'users-list' );

              // if ( storedCustomers )
              // {
              //        const parsedCustomers = JSON.parse( storedCustomers );
              //        console.log( 'Données récupérées du localStorage:', parsedCustomers );

              //        if ( parsedCustomers && parsedCustomers.data && Array.isArray( parsedCustomers.data ) )
              //        {
              //               // Accéder directement au tableau des utilisateurs
              //               this.customers = parsedCustomers.data;
              //               // console.log( 'Tableau des utilisateurs après récupération:', this.customers );
              //        } else
              //        {
              //               // console.error( 'Les données dans localStorage ne contiennent pas un tableau valide:', parsedCustomers );
              //               this.customers = [];
              //        }

              //        this.totalData = this.customers.length;

              //        if ( Array.isArray( this.customers ) )
              //        {
              //               // console.log( 'Liste des utilisateurs:', this.customers );
              //               const paginatedData = this.customers.slice( this.pageOption.skip, this.pageOption.skip + this.pageOption.limit );
              //               this.dataSource.data = paginatedData; // Mettez à jour ici

              this.trierParRoles( this.dataSource.data )
              //               // console.log( 'Données paginées ajoutées à dataSource.data:', this.dataSource.data ); // Log de dataSource.data
              //        }
              // } else
              // {
              this.userService.getAllUsers()
                     .then( ( result ) =>
                     {
                            console.log( 'Données récupérées du service:', result );
                            if ( result && result.data && Array.isArray( result.data ) )
                            {

                                   this.trierParRoles( result.data )
                                   this.customers = result.data;

                                   this.paginationService.tableauUSerGet = this.customers
                                   this.paginationService.updateTab()
                                   console.log( 'current pageeeeeeeeeeee', this.paginationService.start )
                                   // this.dataSource = new MatTableDataSource<User>( this.paginationService.tableauUSerToshow );
                                   // console.log( 'Tableau des utilisateurs récupérés du service apres une requette de la base de donnees:', result.data );
                            } else
                            {
                                   console.error( 'Données du service ne contiennent pas un tableau d\'utilisateurs:', result );
                                   this.customers = [];
                            }

                            this.totalData = this.customers.length;

                            if ( this.paginationService.start === 0 ) 
                            {


                                   // console.log( 'Liste des utilisateurs:', this.customers );
                                   const paginatedData = this.customers.slice( this.pageOption.skip, this.pageOption.skip + this.pageOption.limit );
                                   this.dataSource.data = paginatedData; // Mettez à jour ici
                                   // console.log( 'Données paginées ajoutées à dataSource.data:', this.dataSource.data ); // Log de dataSource.data

                            } else
                            {
                                   this.dataSource = new MatTableDataSource<User>( this.paginationService.tableauUSerToshow )

                            }

                            // this.trierParRoles( this.dataSource.data )

                            // Mettez à jour le stockage local
                            localStorage.setItem( 'users-list', JSON.stringify( result ) );
                     } )
                     .catch( ( error ) =>
                     {
                            this.toastr.error( error.message, '', { timeOut: 7000 } );
                     } )
                     .finally( () =>
                     {
                            this.waiting = false; // Fin du chargement
                            this.dataIsloading = false
                            this.dataIsLoaded = true
                     } );
              // }
       }



       getTableData( pageOption: pageSelection ): void
       {
              const storedCustomers = localStorage.getItem( 'users-list' );
              if ( storedCustomers )
              {
                     this.customers = JSON.parse( storedCustomers ).data;

                     if ( !Array.isArray( this.customers ) )
                     {
                            this.customers = Object.values( this.customers );

                     }

                     this.totalData = this.customers.length;

                     this.paginationService.tableauUSerGet = this.customers
                     this.paginationService.updateTab()


                     const paginatedData = this.paginationService.tableauUSerToshow
                     this.dataSource = new MatTableDataSource<User>( paginatedData );
                     // Log pour vérifier les données de la page paginée 
                     // console.log( 'Données paginées:', paginatedData );
                     // console.log( 'this.dataSource après pagination:', this.dataSource.data );
                     // Création de l'objet avec les valeurs que vous souhaitez passer


                     const paginationInfo = {
                            totalData: this.totalData,
                            pageSize: this.pageSize,
                            tableData: paginatedData,
                            serialNumberArray: this.serialNumberArray,
                            tableData2: paginatedData // Assurez-vous que 'tableData2' correspond à ce qui est attendu dans 'pageSizeCal'
                     };
                     // Passer l'objet à la méthode next
                     this.paginationService.calculatePageSize.next( paginationInfo );


                     this.waiting = false;
              }
       }










       stopPropagation( event: Event ): void
       {
              // Empêche la fermeture automatique du dropdown
              event.stopPropagation();
       }



       stop()
       {

       }



       groupUsersByThree( data: User[] ): User[][] | false
       {
              // Vérifier si les deux tableaux sont égaux
              if ( isEqual( this.dataSource.data, data ) )
              {
                     let newgroupedUsers: User[][] = [];

                     // Regrouper les utilisateurs par paquets de 3
                     for ( let i = 0; i < data.length; i += 3 )
                     {
                            newgroupedUsers.push( data.slice( i, i + 3 ) );
                     }

                     return newgroupedUsers;
              } else
              {
                     // Si les tableaux ne sont pas égaux, retourner false
                     return false;
              }
       }



}


export interface pageSizeCal
{
       totalData: number;
       pageSize: number;
       tableData: User[];
       tableData2?: User[]; // Rend tableData2 facultatif
       serialNumberArray: number[];
}
