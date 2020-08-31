import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { StorageService } from '../shared/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in-body',
  templateUrl: './log-in-body.component.html',
  styleUrls: ['./log-in-body.component.css'],
  providers: [LoginService, StorageService]
})
export class LogInBodyComponent implements OnInit {

  public loginForm: FormGroup;
  public OTPForm: FormGroup;
  public validate: FormGroup;
  public showLoginForm: boolean = false;
  public loginSubscription$: Subscription;
  public setMessage: any = {};
  public enterNewPassword: boolean = false;
  public loading: boolean = false;
  public getOtpButton: boolean = true;
  public name: string;

  get f(): any { return this.loginForm.controls; }
  constructor(private formBuilder: FormBuilder,
    private router: Router, private _loginService: LoginService, private _storage: StorageService, private formBuilder2: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userPwd: ['', [Validators.required, Validators.minLength(1)]],
      eMail: ['', Validators.required]
    });
    this.OTPForm = this.formBuilder.group({
      eMailForOtp: ['', Validators.required],
      otpInt: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  //Togel Login Form Ang Forget Password Form
  showLogin() {
    this.showLoginForm = !this.showLoginForm;
    this.enterNewPassword = false;
    this.getOtpButton = true;
  }

  //Check Login
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginSubscription$ = this._loginService.checkUserLogin(this.loginForm.value).subscribe(resp => {
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
        if (resp.userRole.toUpperCase() == 'ROLE_ADMIN') {
          this._storage.setSession('isAuthenticated', true);
          this._storage.setSession('eMail', userEmail);
          this._storage.setSession('userRole', "Admin");
          this.router.navigate(['/']);
        }
        if (resp.userRole.toUpperCase() == 'ROLE_USER' || resp.userRole.toUpperCase() == 'ROLE_MANAGER' || resp.userRole == 'ROLE_TEAMLEAD') {
          this._storage.setSession("isAuthenticated", true);
          this._storage.setSession('eMail', userEmail);
          this._storage.setSession('userRole',userRole);
          this.router.navigate(['/']);
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
  getOtp() {
    this.loading = true;
    this.loginSubscription$ = this._loginService.generateOtp(this.OTPForm.value).subscribe(resp => {
      this.loading = false;
      if (resp.status === 200) {
        console.log(resp)
        this.getOtpButton = false;
        this.enterNewPassword = true;
        this.setMessage = { message: resp.msg, msg: true };
      }
      else {
        this.setMessage = { message: resp.msg, error: true };
      }
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
  }
  changePassword() {
    this.loginSubscription$ = this._loginService.changePassword(this.OTPForm.value).subscribe(resp => {
      if (resp.status === 200) {
        this.setMessage = { message: resp.msg, msg: true };
      }
      else {
        this.setMessage = { message: resp.msg, error: true };
      }
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
  }
}
