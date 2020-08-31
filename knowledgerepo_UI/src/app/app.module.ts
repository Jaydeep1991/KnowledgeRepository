import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Footer} from './shared/footer/component.footer';
import { HeadderComponent } from './shared/headder/headder.component';
import { LogInBodyComponent } from './log-in-body/log-in-body.component';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './admin/company/company.component';
import { StorageService } from '../app/shared/storage.service';
import { ToastrModule } from 'ngx-toastr';
import { AlertModule } from 'ngx-bootstrap';
import {ConfirmationService} from 'primeng/api';
import {HttpClientModule} from '@angular/common/http'
import { DepartmentComponent } from './admin/department/department.component'
import { ProjectComponent } from './admin/project/project.component'
import { TeamComponent } from './admin/team/team.component'
import { CreateUserComponent } from './admin/create-user/user.component'

import { UserComponent } from './user/user.component';
import { SearchComponent } from './user/search/search.component';
import { ShowComponent } from './user/show/show.component';
import { UploadComponent } from './user/upload/upload.component';
import { HeaderLogInComponent } from './shared/header-log-in/header-log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {QuillModule} from 'ngx-quill';
import {MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule, MatListModule } from '@angular/material';
import { ErrorAlertComponent } from '../app/shared/error-alert/error-alert.component';
import { MsgAlertComponent } from './shared/msg-alert/msg-alert.component';
import {MatTableModule} from '@angular/material/table';
import { TagComponent } from './admin/tag/tag.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ViewFileComponent } from './user/view-file/view-file.component';
import { MatPaginatorModule } from '@angular/material';
import { LoadingComponent } from './shared/loading/loading.component';
import { SearchFileComponent } from './user/search/search-file/search-file.component';
import { SearchTypeComponent } from './user/search/search-type/search-type.component';
import { AllUserComponent } from './admin/all-user/all-user.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LandingPageComponent } from './admin/landing-page/landing-page.component';
import { AssignTeamComponent } from './admin/assign-team/assign-team.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { QuestionsComponent } from './admin/questions/questions.component';
import { QuestionslistComponent } from './admin/questionslist/questionslist.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AllQuestionsComponent } from './admin/all-questions/all-questions.component';
import { MaterialModule } from './material/material.module';
import { UserProfileComponent } from './admin/user-profile/user-profile.component';
import { LandingPageNewComponent } from './admin/landing-page-new/landing-page-new.component';

@NgModule({
  declarations: [
    AppComponent,
    Footer,
    HeadderComponent,
    LogInBodyComponent,
    AdminComponent,
    CompanyComponent,
    DepartmentComponent,
    ProjectComponent,
    TeamComponent,
    CreateUserComponent,
    UserComponent,
    SearchComponent,
    ShowComponent,
    UploadComponent,
    HeaderLogInComponent,
  
    ErrorAlertComponent,
  
    MsgAlertComponent,
  
    TagComponent,
  
    DashboardComponent,
  
    ViewFileComponent,
  
    LoadingComponent,
  
    SearchFileComponent,
  
    SearchTypeComponent,
  
    AllUserComponent,
  
    UserDetailsComponent,
  
    SignUpComponent,
  
    LandingPageComponent,
    AssignTeamComponent,
  
    QuestionsComponent,
  
    QuestionslistComponent,
  
    AllQuestionsComponent,
  
    UserProfileComponent,
  
    LandingPageNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    ToastrModule.forRoot(),
    AlertModule.forRoot(),
    BrowserModule,
    ChartsModule,
    MatTableModule,
    MatPaginatorModule,
    Ng2SearchPipeModule,
    NgMultiSelectDropDownModule.forRoot(),
    MaterialModule,
    QuillModule.forRoot()
    
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule
  ],
  
  providers: [StorageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
