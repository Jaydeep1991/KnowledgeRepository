import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../module-service/project.service';
import { StorageService } from '../../shared/storage.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService, StorageService]

})
export class ProjectComponent implements OnInit {
  createProjectData: FormGroup;
  projectSubscription$: Subscription;
  companyNames: string[];
  departmentNames:string[];
  companyNameSubscription$: Subscription;
  departmentNameSubscription$: Subscription;
  setMessage: any = {};
  msg: String;
  status: String;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _projectService: ProjectService,
    private _storage: StorageService,
    private _companyNameService: ProjectService,
    private _departmentNameService: ProjectService
  ) { }


  ngOnInit() {
    this.companyNameSubscription$ = this._companyNameService.getCompanyName().subscribe(resp => {
      this.companyNames = resp;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })

    this.createProjectData = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(1)]],
      departmentName: ['', [Validators.required, Validators.minLength(2)]],
      projectName: ['', [Validators.required, Validators.minLength(2)]]
    });
   // sessionStorage.clear();
  }

  onSubmit() {
    if (this.createProjectData.invalid) {
      return;
    }
    console.log("output Test",this.createProjectData.value.companyName)
    this.projectSubscription$ = this._projectService.createProject(this.createProjectData.value).subscribe(resp => {
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
  onChange(event){ 
    this.departmentNameSubscription$ = this._departmentNameService.getDepartmentName(event.target.value).subscribe(resp => {
      this.departmentNames = resp;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }
  }    
