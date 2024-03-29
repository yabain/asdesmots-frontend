import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserDetailsModule } from '../../shared/user-details/user-details.module';
@NgModule({
  declarations: [ ProfileComponent ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    RouterModule,
    TranslateModule,
  UserDetailsModule],
})
export class ProfileModule {

}
