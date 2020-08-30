import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, from} from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CompanyService } from '../../module-service/company.service';
import { StorageService } from '../../shared/storage.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { EditCientService } from './edit-client.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService, StorageService]
})
export class CompanyComponent implements OnInit {
  createCompanyData: FormGroup;
  companySubscription$: Subscription;
  editClientSubscription: Subscription;
  setMessage: any = {};
  successMsg: boolean = false;
  errorMsg: boolean = false;
  msg: String;
  status: String;
  public dataSource: any;
  displayedColumns: string[];
  companyNameSubscription: Subscription;
  companyNames:any;
  public showClient: boolean = true;
  public editClient: boolean = false;
  public companyIdForEdit:number;
  public companyNameForEdit:string;
  public editClientData : FormGroup;
  public show:boolean = false;
  
  
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private _companyService: CompanyService, 
    private _storage: StorageService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private editClientService:EditCientService) { }

  ngOnInit() {
    this.displayedColumns = ['CompanyId','CompanyName','Edit'];
    this.companySubscription$ = this._companyService.getCompany().subscribe(respObj => {
      console.log(respObj)
      this.dataSource = new MatTableDataSource(respObj);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
    this.createCompanyData = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  toggle() {
    this.show = !this.show;
  }
  showDetails() {
    this.showClient = true;
    this.editClient = false;
  }
  edit(companyId: number,companyName:string) {
    this._storage.setSession('companyIdForEdit', companyId);
    this._storage.setSession('companyNameForEdit', companyName);
    this.companyIdForEdit = companyId;
    this.companyNameForEdit = companyName;
    this.editClientData = this.formBuilder.group({
      companyId:['', [Validators.required, Validators.minLength(1)]],
      companyName: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.showClient = false;
    this.editClient = true;
  }
  updateClient(){
    this.editClientSubscription = this.editClientService.editClient(this.editClientData.value).subscribe(resp => {
      console.log("response Object ", resp);
      this.setMessage = { message: "Client updated sucessfully", msg: true };
      this.ngOnInit();
      this.showClient = true;
      this.editClient = false;
    })
  }
  onSubmit() {
    if (this.createCompanyData.invalid) {
      return;
    }
    this.companySubscription$ = this._companyService.createCompany(this.createCompanyData.value).subscribe(resp => {
      console.log("response Object ", resp);
      this.msg = resp.msg;
      this.ngOnInit();
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
