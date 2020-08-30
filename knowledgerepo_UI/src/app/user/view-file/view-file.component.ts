import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShowService } from '../show.service';
import { MatPaginator, MatTableDataSource } from '@angular/material'

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {
  responceObject: any;
  dataSource: any;
  displayedColumns: string[];
  setMessage: any = {};
  public tableHeader:string='#C8E6C9';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  userSubscription: Subscription;

  constructor(
    private _userService: ShowService,
  ) { }

  //Without Pagination

  /*
   ngOnInit() {
     this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
     this.userSubscription = this._userService.getDocument().subscribe(respObj => {
       this.responceObject = respObj;
       this.dataSource = new MatTableDataSource(this.responceObject);
     }, err => {
       this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
     })
 */

//With Pagination
  ngOnInit() {
    this.displayedColumns = ['position','uploadFileTo', 'name','company','project','Team', 'weight', 'size','symbol'];
    this.userSubscription = this._userService.getDocument().subscribe(respObj => {
      console.log(respObj)
      this.dataSource = new MatTableDataSource(respObj);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    }) 
  }
  
  //view File
  viewFile(url: string) {
    window.open(url, '_blank', '', true);
  }
}
