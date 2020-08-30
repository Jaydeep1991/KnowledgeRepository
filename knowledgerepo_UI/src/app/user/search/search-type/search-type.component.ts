import { Component, OnInit,ViewChild } from '@angular/core';
import { ShowService } from '../../show.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { StorageService } from '../../../shared/storage.service';

@Component({
  selector: 'app-search-type',
  templateUrl: './search-type.component.html',
  styleUrls: ['./search-type.component.css']
})
export class SearchTypeComponent implements OnInit {

  searchSubscription$: Subscription;
  eMail: string;
  FileDetailsTag: string[];
  FileDetailsType: string[];
  setMessage: any = {};
  searchByTagData: FormGroup;
  searchByTypeData: FormGroup;
  tagNameSubscription$: Subscription;
  tagNames: string[];
  typeName:string;
  dataSource: any;
  displayedColumns: string[];
  public tableHeader:string='#C8E6C9';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  userSubscription: Subscription;
  constructor(
    private formBuilderTag: FormBuilder,
    private formBuilderType: FormBuilder,
    private _storage: StorageService,
    private _searchService: ShowService

  ) { }

  ngOnInit() {
    this.typeName = this._storage.getSession('typeName');
    this.displayedColumns = ['position','uploadFileTo', 'name','company','project','Team', 'weight', 'size','symbol'];
    this.searchSubscription$ = this._searchService.getFileType(this.typeName).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }

  viewFile(url: string) {
    console.log('-----------I am opened-----------',url);
    window.open(url, '_blank', '', true);
  }
}
