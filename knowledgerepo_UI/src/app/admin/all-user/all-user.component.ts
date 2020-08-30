import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../module-service/user.service';
import { MatPaginator, MatTableDataSource } from '@angular/material'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EditUserService } from '../all-user/edit-user.service';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {

  public userSubscription: Subscription;
  public editUserSubscription:Subscription;
  setMessage: any = {};msg: string; status: String;
  public userList: string[];
  responceOpject: string[];
  public dataSource: any;
  public displayedColumns: string[];
  public showUser: boolean = true;
  public editForm: boolean = false;
  public emailForEdit: string;
  public editUserData: FormGroup;
  public isUserName:string;
  public tableHeader:string='#C8E6C9';
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _storage:StorageService,
    private editUserService:EditUserService
  ) { }

  ngOnInit() {
    this.displayedColumns = ['name', 'email', 'phone','role', 'edit', 'delete'];
    this.userSubscription = this.userService.getAllUser().subscribe(respObj => {
      console.log(respObj)
      this.dataSource = new MatTableDataSource(respObj);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
    this.isUserName=sessionStorage.getItem('userName');
  }

  showDetails() {
    //Show User List
    this.showUser = true;
    //Hide Edit Form
    this.editForm = false;
  }

  //Edit User
  edit(email: string) {
    this._storage.setSession('emailForEdit', email);
    this.emailForEdit = email;
    this.editUserData = this.formBuilder.group({
      userCompany: [''],
      userdepartment: [''],
      userProjectName: [''],
      userTeamName: [''],
      eMail:[''],
      //eMail: new FormControl({ value: this.emailForEdit, disabled: true }, Validators.required),
      userRole: ['', [Validators.required, Validators.minLength(1)]]
    });
  
    //Hide User List
    this.showUser = false;

    //Show Edit Form
    this.editForm = true;
  }

  //Delete User
  delete(email: string) {
    this.userSubscription = this.userService.deleteUser(email).subscribe(respObj => {
      if (respObj.status == 'SUCCESS') {
        this.setMessage = { message: respObj.msg, msg: true };
        //Reload The Data 
        this.userSubscription = this.userService.getAllUser().subscribe(respObj => {
          this.dataSource = new MatTableDataSource(respObj);
          this.dataSource.paginator = this.paginator;
        }, err => {
          this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
        })
      } else {
        this.setMessage = { message: respObj.msg, error: true };
      }
    }, err => {
      this.setMessage = { message: 'Server Unreachable ,Please Try Again Later !!', error: true };
    })
  }

  onSubmit(){
    this.editUserSubscription = this.editUserService.editUser(this.editUserData.value).subscribe(resp => {
      console.log("response Object ", resp);
      this.setMessage = { message: "Role Updated", msg: true };
      //this.responceOpject=JSON.stringify(resp);
      //this.msg=resp.msg;
   /*   if (this.status == 'SUCCESS') {
        this.setMessage = { message: "Role Updated", msg: true };
      } else if (this.status == 'ERROR') {
        this.setMessage = { message: "Something Went Wrong", msg: true };
      }*/
    })
  }
}
