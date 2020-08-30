import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  checkUserLogin(loginData): Observable<any> {
    var login: { 'eMail': string, 'userPwd': string } = { 'eMail': loginData.eMail, 'userPwd': loginData.userPwd };
    return this.http.post(this.baseUrl + '/api/dropbox/checkLogin', login
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  //Generate OTP
  generateOtp(OTPForm): Observable<any> {
    var otp: { 'eMailForOtp': string } = { 'eMailForOtp': OTPForm.eMailForOtp };
    return this.http.post(this.baseUrl + '/api/dropbox/forgetPassword', otp
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }


  //Change Password
  changePassword(OTPForm): Observable<any> {
    var update: { 'eMailForOtp': string, 'otpInt': string, 'newPassword': string } = { 'eMailForOtp': OTPForm.eMailForOtp, 'otpInt': OTPForm.otpInt, 'newPassword': OTPForm.newPassword };
    return this.http.post(this.baseUrl + '/api/dropbox/validateOtp', update
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}
