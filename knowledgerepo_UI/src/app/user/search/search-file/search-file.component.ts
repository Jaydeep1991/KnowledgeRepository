import { Component, OnInit,ViewChild } from '@angular/core';
import { ShowService } from '../../show.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { StorageService } from '../../../shared/storage.service';

@Component({
  selector: 'app-search-file',
  templateUrl: './search-file.component.html',
  styleUrls: ['./search-file.component.css']
})
export class SearchFileComponent implements OnInit {
  searchSubscription$: Subscription;
  eMail: string;
  FileDetailsTag: string[];
  FileDetailsType: string[];
  setMessage: any = {};
  searchByTagData: FormGroup;
  searchByTypeData: FormGroup;
  tagNameSubscription$: Subscription;
  tagNames: string[];
  tagName:string;
  public tableHeader:string='#C8E6C9';

  dataSource: any;
  displayedColumns: string[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  userSubscription: Subscription;
  constructor(
    private formBuilderTag: FormBuilder,
    private formBuilderType: FormBuilder,
    private _storage: StorageService,
    private _searchService: ShowService

  ) { }

  ngOnInit() {
    this.tagName = this._storage.getSession('tagName');
    this.displayedColumns = ['position','uploadFileTo', 'name','company','project','Team', 'weight','size', 'symbol'];
    this.searchSubscription$ = this._searchService.getFileTag(this.tagName).subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }

  viewFile(url: string) {
    window.open(url, '_blank', '', true);
  }
}
