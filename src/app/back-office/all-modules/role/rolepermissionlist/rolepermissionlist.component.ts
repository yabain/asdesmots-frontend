import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { RoleService } from '../service/role.service';
import { Permission } from 'src/app/shared/entities/permission';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';

@Component({
  selector: 'app-rolepermissionlist',
  templateUrl: './rolepermissionlist.component.html',
  styleUrls: ['./rolepermissionlist.component.css'],
})
export class RolepermissionlistComponent implements OnInit {
  roleId: string = '';

  permissionData: Permission = new Permission();
  listPermission: Permission[] = [];

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private translate: TranslateService,
    private translation: TranslationService,
    private Location: Location,
    public roleService: RoleService
  ) {
    this.translate.use(this.translation.getLanguage());
    this.startListener();

    this.getRoleData();
  }

  ngOnInit(): void {}
  ChangeDetectorRef() {
    console.log('Url Change', this.router.snapshot.params['id']);
  }
  getRoleData() {
    this.roleId = this.router.snapshot.params['id'];
    this.listPermission = this.roleService.getRoleData(this.roleId).permissions;
    console.log('application permission', this.listPermission);

    this.roleService.listPermission.forEach((permission, index) => {
      if (
        this.listPermission.findIndex((val) => val._id === permission._id) != -1
      ) {
        this.roleService.listPermission[index].isEnable = true;
      }
    });
  }

  startListener() {
    //on id on url change...
    this.route.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.resetPermission();

        this.getRoleData();
      }
    });
  }

  backClicked() {
    this.resetPermission();
    this.Location.back();
  }

  resetPermission() {
    this.roleService.listPermission.map((val) => {
      val.isEnable = false;
    });
  }
  doRemovePermission() {
    this.roleService.removePermission({
      roleId: this.roleId,
      permissionId: this.permissionData._id,
    });
  }

  savePermissions() {
    const selectedpermissions = this.roleService.listPermission.filter(
      (permission) => permission.isEnable == true
    );

    this.roleService.savePermissions({
      roleId: this.roleId,
      permissions: selectedpermissions,
    });
  }
}
