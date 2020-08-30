import { Component, OnInit } from '@angular/core';
//import { ChartsModule } from 'ng2-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TagNameService } from '../../module-service/tag-name.service';
import { DepartmentService } from '../../module-service/department.service';
import { ProjectService } from '../../module-service/project.service';
import { TeamService } from '../../module-service/team.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tagNameSubscription$: Subscription;
  companyNameSubscription: Subscription;
  departmentNameSubscription$: Subscription;

  setMessage: any = {};
  companyNames: string[];
  departmentNames: string[];
  projectNames: string[];
  chartData: FormGroup;
  tagNames: string[];
  typeNames: string[];
  tagDataArray: string[] = [];
  tagNumberArray: number[] = [];

  typeDataArray: string[] = [];
  typeNumberArray: number[] = [];

  company: string;
  departmentName: string;
  projectName: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _tagNameService: TagNameService,
    private _companyNameService: DepartmentService,
    private _departmentNameService: ProjectService,
    private _teamService: TeamService
  ) { }

  ngOnInit() {

    //Initialze FormGroup
    this.chartData = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(1)]],
      departmentName: ['', [Validators.required, Validators.minLength(2)]],
      projectName: ['', [Validators.required, Validators.minLength(2)]],
      teamName: ['', [Validators.required, Validators.minLength(2)]]
    });

    //Get Company Name
    this.companyNameSubscription = this._companyNameService.getCompanyName().subscribe(resp => {
      this.companyNames = resp;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
    //get Tag Name And Tag No
    this.tagNameSubscription$ = this._tagNameService.getTagData().subscribe(resp => {
      this.tagNames = resp;
      resp.forEach(element => {
        this.tagDataArray.push(element.tagName);
        this.tagNumberArray.push(element.tagNumber);
      });
      console.log("Tag Name Array ", this.tagDataArray)
      console.log("Tag Number Array ", this.tagNumberArray)
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    });

    //get Type Name Type No
    this.tagNameSubscription$ = this._tagNameService.getTypeData().subscribe(resp => {
      this.typeNames = resp;
      resp.forEach(element => {
        this.typeDataArray.push(element.typeName);
        this.typeNumberArray.push(element.typeNumber);
      });
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }

  onChange(event) {
    this.tagDataArray.splice(0, this.tagDataArray.length);
    this.tagNumberArray.splice(0, this.tagNumberArray.length);
    //get Tag Name And Tag No Of Selected Company
    this.company = event.target.value;
    this.tagNameSubscription$ = this._tagNameService.getCompanyTagData(event.target.value).subscribe(resp => {
      console.log(resp)
      resp.forEach(element => {
        this.tagDataArray.push(element.tagName);
        this.tagNumberArray.push(element.tagNumber);
      });
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    });

    //Empty the Array
    this.typeDataArray.splice(0, this.typeDataArray.length);
    this.typeNumberArray.splice(0, this.typeNumberArray.length);
    //get Type Name Type No Of Selected Company
    this.tagNameSubscription$ = this._tagNameService.getCompanyTypeData(event.target.value).subscribe(resp => {
      this.typeNames = resp;
      resp.forEach(element => {
        this.typeDataArray.push(element.typeName);
        this.typeNumberArray.push(element.typeNumber);
      });
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })

    //Get Department
    this.departmentNameSubscription$ = this._departmentNameService.getDepartmentName(event.target.value).subscribe(resp => {
      this.departmentNames = resp;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }


  onDepartment(event) {
    this.departmentName = event.target.value;
    //Empty the Array
    this.tagDataArray.splice(0, this.tagDataArray.length);
    this.tagNumberArray.splice(0, this.tagNumberArray.length);
    //Get Tag Data Based On Company And Department
    this.tagNameSubscription$ = this._tagNameService.getDepartmentTag(this.company, this.departmentName).subscribe(resp => {
      console.log(resp)
      resp.forEach(element => {
        this.tagDataArray.push(element.tagName);
        this.tagNumberArray.push(element.tagNumber);
      });
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    });

    //get Type Name Type No Of Selected Company
    //Empty the Array
    this.typeDataArray.splice(0, this.typeDataArray.length);
    this.typeNumberArray.splice(0, this.typeNumberArray.length);

    this.tagNameSubscription$ = this._tagNameService.getDepartmentType(this.company, this.departmentName).subscribe(resp => {
      this.typeNames = resp;
      resp.forEach(element => {
        this.typeDataArray.push(element.typeName);
        this.typeNumberArray.push(element.typeNumber);
      });
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })

    //Get Project Name
    let selected_Department = event.target.value;
    this.departmentNameSubscription$ = this._teamService.getProjectName(this.company, selected_Department).subscribe(respObj => {
      this.projectNames = respObj;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }

  onClickProject(event) {
    this.projectName = event.target.value;
    //Empty the Array
    this.tagDataArray.splice(0, this.tagDataArray.length);
    this.tagNumberArray.splice(0, this.tagNumberArray.length);
    //Get Tag Data Based On Company And Department
    this.tagNameSubscription$ = this._tagNameService.getProjectTag(this.company, this.departmentName, this.projectName).subscribe(resp => {
      console.log(resp)
      resp.forEach(element => {
        this.tagDataArray.push(element.tagName);
        this.tagNumberArray.push(element.tagNumber);
      });
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    });

    //get Type Name Type No Of Selected Project,Department,Company
    //Empty the Array
    this.typeDataArray.splice(0, this.typeDataArray.length);
    this.typeNumberArray.splice(0, this.typeNumberArray.length);

    this.tagNameSubscription$ = this._tagNameService.getProjectType(this.company, this.departmentName, this.projectName).subscribe(resp => {
      this.typeNames = resp;
      resp.forEach(element => {
        this.typeDataArray.push(element.typeName);
        this.typeNumberArray.push(element.typeNumber);
      });
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }

  onClickReset(event){

    //Empty Tag Array
    this.tagDataArray.splice(0, this.tagDataArray.length);
    this.tagNumberArray.splice(0, this.tagNumberArray.length);

    //Empty Type Array
    this.typeDataArray.splice(0, this.typeDataArray.length);
    this.typeNumberArray.splice(0, this.typeNumberArray.length);

    this.ngOnInit();
  }

  //Document tag Chart
  public barChartOptionsType = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabelsType = this.tagDataArray;
  public barChartTypeType = 'doughnut';
  public barChartLegendType = true;
  public numArray: number[] = this.tagNumberArray;
  public barChartDataType = [
    { data: this.numArray, label: 'Total File On the Basis Of Tags' }
  ];
  pieChartColor: any = [
    {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)',
        'rgba(43, 112, 224,0.9)',
        'rgba(24, 237, 70,0.9)',
        'rgba(255,165,0,0.9)',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)',
        'rgba(43, 112, 224,0.9)',
        'rgba(24, 237, 70,0.9)'
      ]
    }
  ]

  //Document Type Chart
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = this.typeDataArray;
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public typenumArray: number[] = this.typeNumberArray;
  public barChartData = [
    { data: this.typeNumberArray, label: 'Total File On the Basis Of Tags' }
  ];
  public ticks: {
    beginAtZero: true
  }

}

