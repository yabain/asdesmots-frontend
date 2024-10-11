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

	customers: any;
	waiting: boolean = false;
	userData: User = new User();
	formAddRole: FormGroup;
	isAnyCheckboxChecked: boolean = false;
	roleData: Role = new Role();
	loader: boolean = false;
	isClosed: boolean = false;
	checkedRoles: string[] = [];

	public totalData = 0;
	public pageSize = 10;
	dataSource!: MatTableDataSource<any>;
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

	loadUsers()
	{
		this.customers = localStorage.getItem( 'users-list' );

		if ( this.customers )
		{
			this.customers = JSON.parse( this.customers );
			this.totalData = this.customers.length; // Mettez à jour totalData
			this.getTableData( { skip: 0, limit: this.pageSize } ); // Appel initial pour les données de tableau
			this.waiting = false;
		} else
		{
			this.userService.getAllUsers()
				.then( ( result ) =>
				{
					this.customers = result;
					localStorage.setItem( 'users-list', JSON.stringify( this.customers ) ); // Mettez à jour le stockage local
					this.totalData = this.customers.length; // Mettez à jour totalData
					this.getTableData( { skip: 0, limit: this.pageSize } ); // Appel initial pour les données de tableau
					this.waiting = false;
				} )
				.catch( ( error ) =>
				{
					this.toastr.error( error.message, '', { timeOut: 7000 } );
					this.waiting = false;
				} );
		}
	}

	doAddRole()
	{
		console.log( 'data to add', { userId: this.userData._id, roleId: this.formAddRole.get( 'idRole' ).value } );
		this.roleService.addRoleOnUser( { userId: this.userData._id, roleId: this.formAddRole.get( 'idRole' ).value } );
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
				const aValue = ( a as never )[ sort.active ];
				const bValue = ( b as never )[ sort.active ];
				return ( aValue < bValue ? -1 : 1 ) * ( sort.direction === 'asc' ? 1 : -1 );
			} );
		}
	}

	getTableData( pageOption: pageSelection ): void
	{
		this.customers = localStorage.getItem( 'users-list' );

		if ( this.customers )
		{
			this.customers = JSON.parse( this.customers );
			this.totalData = this.customers.length;

			const paginatedData = this.customers.slice( pageOption.skip, pageOption.skip + pageOption.limit );
			this.dataSource = new MatTableDataSource<User>( paginatedData );

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
					this.customers = result;
					localStorage.setItem( 'users-list', JSON.stringify( this.customers ) ); // Mettez à jour le stockage local
					this.getTableData( pageOption ); // Mettez à jour les données du tableau
					this.waiting = false;
				} )
				.catch( ( error ) =>
				{
					this.toastr.error( error.message, '', { timeOut: 7000 } );
					this.waiting = false;
				} );
		}
	}

	onPageChange( pageEvent: any )
	{
		const pageSize = pageEvent.pageSize;
		const pageIndex = pageEvent.pageIndex;
		const skip = pageIndex * pageSize;

		this.getTableData( { skip, limit: pageSize } );
	}
}

export interface pageSizeCal
{
	totalData: number;
	pageSize: number;
	tableData: any; // Remplacez par le type approprié si possible
	tableData2: any; // Assurez-vous d'avoir cette propriété
	serialNumberArray: number[];
}