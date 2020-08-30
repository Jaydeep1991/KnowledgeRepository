import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { ShowService } from './show.service'
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  private loadSearchComponent: boolean = false;
  private loadShowComponent: boolean = false;
  private loadUploadComponent: boolean = true;
  private showDocumant: boolean = false;
  private showDetails:boolean=false;

  userSubscription$: Subscription;
  eMail: string;
  FileDetails: string[];
  setMessage: any = {};
  storageCloud: boolean;
  storageLocal: boolean;
  userName: String;
  userRole: String;
  userCompany: string;
  userDepartment: string;
  userProject: string;
  userTeam: string;


  constructor(
    private _storage: StorageService,
    private _userService: ShowService
  ) { }

  ngOnInit() {
    this.eMail = this._storage.getSession('eMail');
    this.userName = this._storage.getSession("userName");
    this.userRole = this._storage.getSession("userRole");
    this.userCompany = this._storage.getSession('userCompany');
    this.userDepartment = this._storage.getSession('userDepartment');
    this.userProject = this._storage.getSession('userProject');
    this.userTeam = this._storage.getSession('userTeam');
  }
  SearchComponent() {
    this.loadUploadComponent = false;
    this.loadShowComponent = false;
    this.showDocumant = false;
    this.showDetails=false;
    this.loadSearchComponent = true;
  }
  ShowComponent() {
    this.loadUploadComponent = false;
    this.showDocumant = false;
    this.loadSearchComponent = false;
    this.showDetails=false;
    this.loadShowComponent = true;

  }
  UploadComponent() {
    this.loadSearchComponent = false;
    this.loadShowComponent = false;
    this.loadUploadComponent = true;
    this.showDetails=false;
    this.showDocumant = false;
  }
  onShow() {
    this.showDocumant = true;
    this.loadSearchComponent = false;
    this.loadShowComponent = false;
    this.loadUploadComponent = false;
    this.showDetails=false;
    
    this.userSubscription$ = this._userService.getDocument().subscribe(respObj => {
      this.FileDetails = respObj;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }
  UserDetails() {
    this.loadSearchComponent = false;
    this.loadShowComponent = false;
    this.loadUploadComponent = false;
    this.showDocumant = false;
    this.showDetails=true;
  }

  //View Url
  viewFile(url: string) {
    window.open(url, '_blank', '', true);
  }

  //LogOut
  logOut() {
    sessionStorage.clear();
  }
}

