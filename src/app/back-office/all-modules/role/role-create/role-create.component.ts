import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Location } from '@angular/common';
import { User } from 'src/app/shared/entities/user';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Permission } from 'src/app/shared/entities/permission';
import { log } from 'console';

@Component( {
       selector: 'app-role-create',
       templateUrl: './role-create.component.html',
       styleUrls: [ './role-create.component.css' ]
} )
export class RoleCreateComponent implements OnInit
{



       enter = null
       idxHover = null
       waiting: boolean
       userIsloading: boolean
       dataIsloading: boolean


       customers: User[] = []
       permission: Permission[] = []
       checkedUser: string[] = []
       checkePermission: string[] = []






       constructor (

              public roleService: RoleService,
              private location: Location,
              private userService: UserService,


              private toastr: ToastrService,
              private translate: TranslateService,
              private translation: TranslationService,

       )
       {
              this.roleService.initFormCreatingRole();
              this.initTranslation();
       }








       ngOnInit(): void
       {
              this.loadUsers()
              this.getPermissionList()
       }





       initTranslation()
       {
              this.translate.use( this.translation.getCurrentLanguage() );
       }





       resetFormCreation()
       {
              this.roleService.formCreateRole.reset();
              this.roleService.creationDone = false;
       }














       onMouseEnter( enter: string, idx: number )
       {

              this.enter = enter
              this.idxHover = idx

              // console.log( 'permission hover' )
       }













       onMouseLeave( leave: string )
       {


              if ( leave === 'permissionItem' )
              {

                     this.enter = 'permission'
              } else
              {

                     this.enter = null
                     this.idxHover = null
              }

              // console.log( 'permission hover' )
       }










       getPermissionList()
       {
              this.dataIsloading = true
              console.log( 'fontion pour recuper la liste des permission appeler' )
              this.roleService.getListPermission().subscribe(
                     ( result ) =>
                     {
                            this.dataIsloading = false
                            this.permission = result.data
                            console.log( 'Liste des permissions récupérée avec succès', this.permission );
                     },
                     ( error ) =>
                     {
                            console.error( 'Erreur lors de la récupération des permissions :', error );
                     }
              );

       }











       createRole()
       {
              this.roleService.createRole().subscribe(
                     ( result ) =>
                     {

                            console.log( 'Rôle créé avec succès : ', result );

                            // Ajout des rôles aux utilisateurs sélectionnés
                            const addUserPromises = this.checkedUser.map( ( userId: string ) =>
                            {
                                   return this.roleService.addRoleOnUser( { userId: userId, roleId: result.data._id } ).toPromise()
                                          .then( () =>
                                          {
                                                 console.log( `Utilisateur ajouté avec succès au rôle` );
                                          } )
                                          .catch( ( error ) =>
                                          {
                                                 console.error( `Erreur lors de l'ajout de l'utilisateur au rôle`, error );
                                          } );
                            } );



                            // Attendre que toutes les requêtes (ajout d'utilisateurs et permissions) soient terminées
                            Promise.all( addUserPromises )
                                   .then( () =>
                                   {
                                          // Ajout du tableau de permissions au rôle
                                          const addPermissionPromise = this.roleService.addPermissionOnRole( { roleId: result.data._id, permissionId: this.checkePermission } ).toPromise()
                                                 .then( () =>
                                                 {
                                                        console.log( `Permissions ajoutées avec succès au rôle` );
                                                 } )
                                                 .catch( ( error ) =>
                                                 {
                                                        console.error( `Erreur lors de l'ajout des permissions au rôle`, error );
                                                 } );

                                          // Attendre que toutes les requêtes (ajout d'utilisateurs et permissions) soient terminées
                                          Promise.all( [ addPermissionPromise ] )
                                                 .then( () =>
                                                 {


                                                        this.resetFormCreation();
                                                        console.log( 'Tous les utilisateurs et permissions ont été ajoutés avec succès' );
                                                 } )
                                                 .catch( ( error ) =>
                                                 {
                                                        console.error( 'Erreur lors de l\'ajout de certains utilisateurs ou permissions', error );
                                                 } );

                                   } )
                                   .catch( ( error ) =>
                                   {
                                          console.error( 'Erreur lors de l\'ajout de certains utilisateurs ou permissions', error );
                                   } );
                     },
                     ( error ) =>
                     {
                            console.error( 'Erreur lors de la création du rôle : ', error );
                     }
              );
       }
















       backClicked()
       {
              this.location.back();
       }






       trierParRoles( clients: any[] ): any[]
       {
              return clients.sort( ( a, b ) => b.roles.length - a.roles.length );
       }



















       loadUsers()
       {


              this.userIsloading = true


              console.log( 'loader user appelé' );

              this.userService.getAllUsers()
                     .then( ( result ) =>
                     {
                            console.log( 'Données récupérées du service:', result );
                            if ( result && result.data && Array.isArray( result.data ) )
                            {

                                   this.trierParRoles( result.data )
                                   this.customers = result.data;
                                   console.log( 'Tableau des utilisateurs récupérés du service apres une requette de la base de donnees:', result.data );
                            } else
                            {
                                   console.error( 'Données du service ne contiennent pas un tableau d\'utilisateurs:', result );
                                   this.customers = [];
                            }


                            localStorage.setItem( 'users-list', JSON.stringify( result ) );
                     } )
                     .catch( ( error ) =>
                     {
                            this.toastr.error( error.message, '', { timeOut: 7000 } );
                     } )
                     .finally( () =>
                     {
                            this.waiting = false;
                            this.userIsloading = false
                     } );

       }























       updateCheckboxPermissionState( permission: string )
       {


              const index = this.checkePermission.indexOf( permission );

              if ( index === -1 )
              {
                     this.checkePermission.push( permission );
              }


              if ( index !== -1 )
              {
                     this.checkePermission.splice( index, 1 );
              }


              localStorage.setItem( 'checkedUser', JSON.stringify( this.checkePermission ) );
              console.log( "permission list checked: ", this.checkePermission );
       }






















       updateCheckboxState( user: string )
       {


              const index = this.checkedUser.indexOf( user );

              if ( index === -1 )
              {
                     this.checkedUser.push( user );
              }


              if ( index !== -1 )
              {
                     this.checkedUser.splice( index, 1 );
              }


              localStorage.setItem( 'checkedUser', JSON.stringify( this.checkedUser ) );
              console.log( "user list checked: ", this.checkedUser );
       }




















}
