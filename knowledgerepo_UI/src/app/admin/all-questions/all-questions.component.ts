import { Component, OnInit,ViewChild } from '@angular/core';
import { StorageService } from '../../shared/storage.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DepartmentService } from '../../module-service/department.service'
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css'],
  providers: [StorageService,DepartmentService]
})
export class AllQuestionsComponent implements OnInit {
  questionSubscription:Subscription;
  companyNames : string[];
  questionsList:string[];
  setMessage : any = {};
  public dataSource: any;
  public searchText:string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private _storage: StorageService,private _companyNameService: DepartmentService) { }

  ngOnInit() {
    this.questionSubscription = this._companyNameService.getQuestionsList().subscribe(respObj => {
      this.questionsList=respObj;
      this.dataSource = new MatTableDataSource(respObj);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  }

}
