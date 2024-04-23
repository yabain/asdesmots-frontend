import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { RoleService } from '../service/role.service';
import { Permission } from 'src/app/shared/entities/permission';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { request } from 'http';

@Component({
  selector: 'app-rolepermissionlist',
  templateUrl: './rolepermissionlist.component.html',
  styleUrls: ['./rolepermissionlist.component.css']
})
export class RolepermissionlistComponent implements OnInit {

  roleId : string = '';
  permissionData : Permission = new Permission();
  listPermission: Permission[]=[];
  checkedPermissions: string[] = [];
  loader: boolean = false;

  constructor(
      private router:  ActivatedRoute,
      private route: Router,
      private translate: TranslateService,
      private translation: TranslationService,
      private Location: Location,
      public roleService: RoleService,
  ) {
      this.translate.use(this.translation.getLanguage());

  }

  ngOnInit() {
    // Récupérer les permissions cochées depuis le stockage local
    const storedPermissions = localStorage.getItem('checkedPermissions');
    if (storedPermissions) {
      this.checkedPermissions = JSON.parse(storedPermissions);
    }

    // Vider le stockage local pour les permissions cochées
    localStorage.removeItem('checkedPermissions');
  }

  ChangeDetectorRef(){
      console.log('Url Change', this.router.snapshot.params['id']);
  }

  getRoleData(){
    this.roleId = this.router.snapshot.params['id'];
    this.listPermission = this.roleService.getRoleData(this.roleId).permissions;
    console.log('application permission', this.listPermission);

    this.roleService.listPermission.forEach((permission, index)=>{
        if(this.listPermission.findIndex((val)=> val._id === permission._id) != -1){
            // this.onPermissionChange(this.permissionData);
            this.roleService.listPermission[index].isEnable = true;
        }
    });
  }

  onPermissionChange(permission: any) {
    // Mettre à jour l'état de la case à cocher
    permission.isEnable = !permission.isEnable;
    // Vérifier si au moins une case à cocher est cochée
    this.roleService.isSaveButtonDisabled = this.roleService.listPermission.every(permission => !permission.isEnable);
    // Initialisation du tableau des permissions checkées
    if (permission.checked) {
      this.checkedPermissions.push(permission._id);
      console.log ("permissions checked: ", this.checkedPermissions);
    } else {
      const index = this.checkedPermissions.indexOf(permission._id);
      if (index !== -1) {
        this.checkedPermissions.splice(index, 1);
      }
    }
    // Mettre à jour le stockage local
    localStorage.setItem('checkedPermissions', JSON.stringify(this.checkedPermissions));

  }

  backClicked(){
      this.Location.back();
  }

  doRemovePermission(){
    this.roleService.removePermission({roleId : this.roleId, permissionId: this.permissionData._id});
  }

  addPermissionsOnRole(): void {
     this.roleId = this.router.snapshot.params['id'];
     const roleId = this.roleId;
     console.log("id du role: ", roleId);
     const listPermissionId = this.checkedPermissions;
     this.roleService.addPermissionOnRole({
       roleId: roleId,
       permissionId: listPermissionId
     });

  }

}
