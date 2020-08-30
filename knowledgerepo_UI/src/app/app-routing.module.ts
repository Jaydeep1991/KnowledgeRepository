import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInBodyComponent } from './log-in-body/log-in-body.component';
import { AdminComponent } from './admin/admin.component';
import { CompanyComponent } from './admin/company/company.component';
import { DepartmentComponent } from './admin/department/department.component';
import { ProjectComponent } from './admin/project/project.component';
import { TeamComponent } from './admin/team/team.component';
import { CreateUserComponent } from './admin/create-user/user.component';
import { UserComponent } from './user/user.component';
import { SearchComponent } from './user/search/search.component';
import { ShowComponent } from './user/show/show.component';
import { UploadComponent } from './user/upload/upload.component';
import { AppGuard } from './app.guard';
import { SignUpComponent} from './sign-up/sign-up.component';
import { LandingPageComponent } from './admin/landing-page/landing-page.component';
import { from } from 'rxjs';
import { LandingPageNewComponent } from './admin/landing-page-new/landing-page-new.component';

const routes: Routes = [
  { path: '', component: LandingPageNewComponent },
  { path: 'login', component: LogInBodyComponent },
  {path: 'signup',component:SignUpComponent},
  {path: 'admin', component: AdminComponent,  canActivate: [AppGuard],children: [
    { path: 'create-company', component: CompanyComponent,data: {
      breadcrumb: "Create Company",icon: null
    } },
    { path: 'create-department', component: DepartmentComponent,data: {
      breadcrumb: "Create Department",icon: null
    } },
    { path: 'create-project', component: ProjectComponent,data: {
      breadcrumb: "Create Project",icon: null
    } },
    { path: 'create-team', component: TeamComponent,data: {
      breadcrumb: "Create Team",icon:null
    } },
    { path: 'create-user', component: CreateUserComponent,data: {
      breadcrumb: "Create User",icon:null
    } }],},

    //User Component
    {path: 'user', component: UserComponent,canActivate : [AppGuard], children: [
      { path: 'search-document-by-type', component: SearchComponent,data: {
        breadcrumb: "Create Company",icon: null
      } },
      { path: 'show-document', component: ShowComponent,data: {
        breadcrumb: "Create Department",icon: null
      } },
      { path: 'upload-document', component: UploadComponent,data: {
        breadcrumb: "Create Project",icon: null
      } },],
    },
    // otherwise redirect to login
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule {  }
