import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service'
@Component({
  selector: 'app-header-log-in',
  templateUrl: './header-log-in.component.html',
  styleUrls: ['./header-log-in.component.css']
})
export class HeaderLogInComponent implements OnInit {

  constructor(private _storage: StorageService) { }
  userName: String;
  userRole: String;
  ngOnInit() {
    this.userName = this._storage.getSession("userName");
    this.userRole = this._storage.getSession("userRole");
  }
}
