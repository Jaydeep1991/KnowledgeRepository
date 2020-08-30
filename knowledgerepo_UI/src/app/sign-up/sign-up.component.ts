import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {signUpService } from '../sign-up/sign-up.service';
import { StorageService } from '../shared/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [signUpService, StorageService]
})
export class SignUpComponent implements OnInit {
  public signupForm :FormGroup;
  public setMessage: any = {};
  public signupSubscription$ :Subscription;
  public validate: FormGroup;
  public loading: boolean = false;

  get f(): any { return this.signupForm.controls; }
  constructor(private formBuilder: FormBuilder,
    private router: Router, private _signupService:signUpService, private _storage: StorageService, private formBuilder2: FormBuilder) { }
 

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      eMail: ['', Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      pHone: ['', [Validators.minLength(10),Validators.maxLength(10)]],
      userRole: ['', Validators.required]
    });
  }
  onSubmit(){
    if (this.signupForm.invalid) {
      return;
    }
    this.signupSubscription$ = this._signupService.checkUserSignup(this.signupForm.value).subscribe(resp => {
      let userEmail = resp.eMail;
      let userName = resp.userName;
      let userCompany = resp.userCompany;
      let userDepartment=resp.userdepartment;
      let userProject=resp.userProjectName;
      let userTeam=resp.userTeamName;
      let userRole = resp.userRole;
      this._storage.setSession('userName', userName);
      this._storage.setSession('userCompany', userCompany);
      this._storage.setSession('userDepartment', userDepartment);
      this._storage.setSession('userProject', userProject);
      this._storage.setSession('userTeam', userTeam);
     
      if (resp.status.toUpperCase() == 'SUCCESS') {
        console.log(resp)
        if (resp.userRole.toUpperCase() == 'ROLE_ADMIN') {
          this._storage.setSession('isAuthenticated', true);
          this._storage.setSession('eMail', userEmail);
          this._storage.setSession('userRole', "Admin");
          this.router.navigate(['/admin']);
        }
        if (resp.userRole.toUpperCase() == 'ROLE_USER' || resp.userRole.toUpperCase() == 'ROLE_MANAGER' || resp.userRole == 'ROLE_TEAMLEAD') {
          this._storage.setSession("isAuthenticated", true);
          this._storage.setSession('eMail', userEmail);
          this._storage.setSession('userRole',userRole);
          console.log(this._storage.getSession('Admin'));
          this.router.navigate(['/user']);
        } else {
          this.setMessage = { message: resp.errorMessage, error: true };
        }
      }
      else {
        this.setMessage = { message: resp.msg, error: true };
      }
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
    
  }

}
