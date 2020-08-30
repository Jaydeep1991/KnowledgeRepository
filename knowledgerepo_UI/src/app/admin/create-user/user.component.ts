import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateUserService } from '../create-user/create-user.service';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [CreateUserService, StorageService]
})
export class CreateUserComponent implements OnInit {

  createUserData: FormGroup;
  teamSubscription$: Subscription; companyNameSubscription$: Subscription; departmentNameSubscription$: Subscription; projectNameSubscription$: Subscription;
  companyNames: string[];
  departmentNames: string[];
  projectNames: string[];
  teamNames: string[];
  selectedCompany: string;
  selectedDepartment: string;
  selected_Company: string;
  setMessage: any = {};
  msg: String; status: String;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _createUserService: CreateUserService,
    private _storage: StorageService,
  ) { }


  ngOnInit() {
    this.companyNameSubscription$ = this._createUserService.getCompanyName().subscribe(resp => {
      this.companyNames = resp;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
    this.createUserData = this.formBuilder.group({
      // userCompany: ['', [Validators.required, Validators.minLength(1)]],
      // userdepartment: ['', [Validators.required, Validators.minLength(2)]],
      // userProjectName: ['', [Validators.required, Validators.minLength(2)]],
      // userTeamName: ['', [Validators.required, Validators.minLength(2)]],

      eMail: ['', [Validators.required, Validators.minLength(2)]],
      userName: ['', [Validators.required, Validators.minLength(2)]],
      userRole: ['', [Validators.required, Validators.minLength(1)]],
      pHone:['',[Validators.required, Validators.minLength(10),Validators.maxLength(10)]],

    });
    
  }
  onSubmit() {
    if (this.createUserData.invalid) {
      return;
    }
    this.teamSubscription$ = this._createUserService.createUser(this.createUserData.value).subscribe(resp => {
      this.msg = resp.msg;
      this.status = resp.status.toUpperCase();
      if (this.status == 'ERROR') {
        this.router.navigate(['/admin']);
        this.setMessage = { message: this.msg, error: true };
      } else if (this.status == 'SUCCESS') {
        this.router.navigate(['/admin']);
        this.setMessage = { message: this.msg, msg: true };
      }
    })
  }
  //Get Department Name
  onChangeGetDepartment(event) {
    this.selectedCompany = event.target.value;
    this.departmentNameSubscription$ = this._createUserService.getDepartmentName(this.selectedCompany).subscribe(resp => {
      this.departmentNames = resp;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }

  //Get Project Name Based On Department Name
  onChangeGetProject(event) {
    this.selectedDepartment = event.target.value;
    this.projectNameSubscription$ = this._createUserService.getProjectName(this.selectedCompany, event.target.value).subscribe(respObj => {
      this.projectNames = respObj;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }
  //Get Project Name Based On Department Name
  onChangeGetTeam(event) {
    this.projectNameSubscription$ = this._createUserService.getTeamName(this.selectedCompany, this.selectedDepartment, event.target.value).subscribe(respObj => {
      this.teamNames = respObj;
      console.log(respObj)
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }
}