import { Component, OnInit } from '@angular/core';
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
import { pageSelection, PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';
import { MatTableDataSource } from '@angular/material/table';

@Component( {
	selector: 'app-list-users',
	templateUrl: './list-users.component.html',
	styleUrls: [ './list-users.component.css' ]
} )
export class ListUsersComponent implements OnInit
{
	customers: User[] = []; // Initialisation comme un tableau vide
	waiting: boolean = false;
	userData: User = new User();
	formAddRole: FormGroup;
	isAnyCheckboxChecked: boolean = false;
	roleData: Role = new Role();
	loader: boolean = false;
	isClosed: boolean = false;
	checkedRoles: string[] = [];

	pageOption = {
		skip: 0, // Valeur de décalage
		limit: 10 // Limite d'entrées par page
	};
	public totalData = 0;
	public pageSize = 10;
	dataSource = new MatTableDataSource<any>();
	private pagination: PaginationService;

	public serialNumberArray: Array<number> = [];

	constructor (
		private translate: TranslateService,
		private translationService: TranslationService,
		public roleService: RoleService,
		private userService: UserService,
		private toastr: ToastrService,
		private fb: FormBuilder,
		private location: Location,
		private paginationService: PaginationService // Ajout du service de pagination
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
		this.roleService.getListRoleByUserID( user._id );
	}

	backClicked()
	{
		localStorage.removeItem( 'checkedRoles' );
		this.location.back();
		this.roleService.isSaveButtonIsDisabled = true;
	}

	updateCheckboxState( role: any )
	{
		role.isEnable = !role.isEnable;
		this.roleService.isSaveButtonIsDisabled = this.roleService.listRole.every( role => !role.isEnable );
		if ( role.checked )
		{
			this.checkedRoles.push( role._id );
			console.log( "roles checked: ", this.checkedRoles );
		} else
		{
			const index = this.checkedRoles.indexOf( role._id );
			if ( index !== -1 )
			{
				this.checkedRoles.splice( index, 1 );
			}
		}
		localStorage.setItem( 'checkedRoles', JSON.stringify( this.checkedRoles ) );
	}

	addRoleOnUser(): void
	{
		this.loader = true;
		const listRoleId: string[] = this.checkedRoles;
		const userId = this.userData._id;
		this.roleService.addRoleOnUser( { userId: userId, roleId: listRoleId } ).subscribe(
			( response ) =>
			{
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
				this.loader = false;
			}
		);
	}

	getUserRolePercentage( userRoles: number, totalRoles: number ): number
	{
		let ratio = ( userRoles / totalRoles ) * 100;
		return ratio;
	}

	getRoleNameById( roleId: string ): string
	{
		const role = this.roleService.listRole.find( role => role._id === roleId );
		return role ? role.name : 'Role not found';
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

	onPageChange( event: any ): void
	{
		this.pageOption.skip = event.pageIndex * this.pageOption.limit; // Mettez à jour le décalage
		this.pageOption.limit = event.pageSize; // Mettez à jour la limite
		this.getTableData( this.pageOption ); // Rechargez les données de la table
	}




	loadUsers()
	{
		this.waiting = true; // Début du chargement
		console.log( 'loader user appelé' );
		const storedCustomers = localStorage.getItem( 'users-list' );

		if ( storedCustomers )
		{
			const parsedCustomers = JSON.parse( storedCustomers );
			console.log( 'Données récupérées du localStorage:', parsedCustomers );

			if ( parsedCustomers && parsedCustomers.data && Array.isArray( parsedCustomers.data ) )
			{
				// Accéder directement au tableau des utilisateurs
				this.customers = parsedCustomers.data;
				console.log( 'Tableau des utilisateurs après récupération:', this.customers );
			} else
			{
				console.error( 'Les données dans localStorage ne contiennent pas un tableau valide:', parsedCustomers );
				this.customers = [];
			}

			this.totalData = this.customers.length;

			if ( Array.isArray( this.customers ) )
			{
				console.log( 'Liste des utilisateurs:', this.customers );
				const paginatedData = this.customers.slice( this.pageOption.skip, this.pageOption.skip + this.pageOption.limit );
				this.dataSource.data = paginatedData; // Mettez à jour ici
				console.log( 'Données paginées ajoutées à dataSource.data:', this.dataSource.data ); // Log de dataSource.data
			}
		} else
		{
			this.userService.getAllUsers()
				.then( ( result ) =>
				{
					console.log( 'Données récupérées du service:', result );
					if ( result && result.data && Array.isArray( result.data ) )
					{
						this.customers = result.data;
						console.log( 'Tableau des utilisateurs récupérés du service:', this.customers );
					} else
					{
						console.error( 'Données du service ne contiennent pas un tableau d\'utilisateurs:', result );
						this.customers = [];
					}

					this.totalData = this.customers.length;

					console.log( 'Liste des utilisateurs:', this.customers );
					const paginatedData = this.customers.slice( this.pageOption.skip, this.pageOption.skip + this.pageOption.limit );
					this.dataSource.data = paginatedData; // Mettez à jour ici
					console.log( 'Données paginées ajoutées à dataSource.data:', this.dataSource.data ); // Log de dataSource.data

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
				} );
		}
	}

	getTableData( pageOption: pageSelection ): void
	{
		const storedCustomers = localStorage.getItem( 'users-list' );

		if ( storedCustomers )
		{
			this.customers = JSON.parse( storedCustomers ).data; // Accéder à parsedCustomers.data directement

			// Vérifiez si customers n'est pas un tableau et convertissez-le
			if ( !Array.isArray( this.customers ) )
			{
				console.error( 'Les données dans localStorage ne sont pas un tableau:', this.customers );
				// Convertir en tableau si ce n'est pas un tableau
				this.customers = Object.values( this.customers );
				console.warn( 'parsedCustomers.data n\'est pas un tableau, conversion effectuée:', this.customers );
			}

			this.totalData = this.customers.length;
			const paginatedData = this.customers.slice( pageOption.skip, pageOption.skip + pageOption.limit );
			this.dataSource = new MatTableDataSource<User>( paginatedData );
			console.log( 'Données ajoutées à dataSource:', this.dataSource.data ); // Log de dataSource.data

			this.paginationService.calculatePageSize.next( {
				totalData: this.totalData,
				pageSize: this.pageSize,
				tableData: paginatedData,
				tableData2: [], // Ajoutez ici les données appropriées si nécessaire
				serialNumberArray: this.serialNumberArray,
			} );

			this.waiting = false;
		} else
		{
			this.userService.getAllUsers()
				.then( ( result ) =>
				{
					console.log( 'Données récupérées du service dans getTableData:', result );
					this.customers = result.data;
					this.totalData = this.customers.length;
					const paginatedData = this.customers.slice( pageOption.skip, pageOption.skip + pageOption.limit );
					this.dataSource = new MatTableDataSource<User>( paginatedData );
					console.log( 'Données ajoutées à dataSource:', this.dataSource.data ); // Log de dataSource.data
					localStorage.setItem( 'users-list', JSON.stringify( result ) );
					this.waiting = false;
				} )
				.catch( ( error ) =>
				{
					this.toastr.error( error.message, '', { timeOut: 7000 } );
				} );
		}
	}


}
