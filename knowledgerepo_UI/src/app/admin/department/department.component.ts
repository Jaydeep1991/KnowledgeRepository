import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../../module-service/department.service'
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [DepartmentService, StorageService]
})
export class DepartmentComponent implements OnInit {

  createDepartmentData: FormGroup;
  departmentSubscription: Subscription;
  companyNameSubscription: Subscription;
  setMessage: any = {};
  companyNames: string[];
  msg: String;
  status: String;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _departmentService: DepartmentService,
    private _storage: StorageService,
    private _companyNameService: DepartmentService

  ) { }

  ngOnInit() {
    this.companyNameSubscription = this._companyNameService.getCompanyName().subscribe(resp => {
      this.companyNames=resp;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })

    this.createDepartmentData = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(1)]],
      departmentName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.createDepartmentData.invalid) {
      return;
    }
    this.departmentSubscription = this._departmentService.createDepartment(this.createDepartmentData.value).subscribe(resp => {
      console.log("response Object ", resp);
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
}