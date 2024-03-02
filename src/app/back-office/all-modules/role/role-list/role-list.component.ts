import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';
import { Role } from '../service/role.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { Permission } from 'src/app/shared/entities/permission';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit {
  roleChoose: Role = new Role();
  idRole: string = '';
  permissionData: Permission = new Permission();
  openAccordion: boolean[] = [];

  constructor(
    public roleService: RoleService,
    private translate: TranslateService,
    private translation: TranslationService,
    private router: Router
  ) {
    this.translate.use(this.translation.getLanguage());
    this.loadListRole();
    this.roleService.initFormUpdate();
    this.roleService.initAddingForm();
  }

  ngOnInit(): void {}

  loadListRole() {
    if (this.roleService.listRole.length == 0) {
      this.roleService.getListRole();
    }
  }

  setValue(role: Role) {
    this.roleService.initUpdateForm(role);

    if (this.roleService.listPermission.length == 0) {
      this.roleService.getListPermission();
    }
  }

  navigate(id: string) {
    this.router.navigateByUrl('role/users/' + id);
  }

  navigateToPermissionList(id: string) {
    if (this.roleService.listPermission.length == 0) {
      this.roleService.getListPermission();
    }
    this.router.navigateByUrl('role/list/permission/' + id);
  }

  goToListUser() {}

  addPermission() {
    this.roleService.addPermissionOnRole({
      roleId: this.roleChoose._id,
      permissionId: this.permissionData._id,
    });
  }

  doDelete() {
    this.roleService.deleteRole(this.roleChoose);
  }

  doRemovePermission() {
    this.roleService.removePermission({
      roleId: this.roleChoose._id,
      permissionId: this.permissionData._id,
    });
  }

  reset() {
    this.roleService.permissionAdded = false;
  }

  check(permission: Permission) {
    const include = this.roleChoose.permissions.includes(permission);
    console.log('is exited', include);
  }
}
