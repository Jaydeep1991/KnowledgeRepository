import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamService } from '../../module-service/team.service';
import { StorageService } from '../../shared/storage.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  providers: [TeamService, StorageService]
})
export class TeamComponent implements OnInit {

  createTeamData: FormGroup;
  teamSubscription$: Subscription;
  companyNameSubscription$:Subscription;
  departmentNameSubscription$:Subscription;
  projectNameSubscription$:Subscription;
  companyNames:string[];
  departmentNames:string[];
  projectNames:string[];
  setMessage: any = {};
  selectedCompany:string;
  msg: String;
  status: String;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private _teamService: TeamService,
    private _storage: StorageService,
    ) { }


  ngOnInit() {
    this.companyNameSubscription$ = this._teamService.getCompanyName().subscribe(resp => {
      this.companyNames=resp;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
    this.createTeamData = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(1)]],
      departmentName: ['', [Validators.required, Validators.minLength(2)]],
      projectName: ['', [Validators.required, Validators.minLength(2)]],
      teamName: ['', [Validators.required, Validators.minLength(2)]]
    });
    //sessionStorage.clear();
  }
  onSubmit() {
    if (this.createTeamData.invalid) {
      return;
    }

    this.teamSubscription$ = this._teamService.createTeam(this.createTeamData.value).subscribe(resp => {
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
  //Get Department Name
  onChangeGetDepartment(event){ 
    this.selectedCompany=event.target.value;
    this.departmentNameSubscription$ = this._teamService.getDepartmentName(this.selectedCompany).subscribe(resp => {
      this.departmentNames = resp;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }

  //Get Project Name Based On Department Name
  onChangeGetProject(event){ 
    let selected_Company=this.selectedCompany;
    let selected_Department=event.target.value;
    this.projectNameSubscription$ = this._teamService.getProjectName(selected_Company,selected_Department).subscribe(respObj => {
      this.projectNames = respObj;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }
  
  
}
