import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './Services/rest.service';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { SuiteCmpComponent } from './components/suite-cmp/suite-cmp.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    CreateUserComponent,
    StartPageComponent,
    AdminPanelComponent,
    FormLoginComponent,
    SuiteCmpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
