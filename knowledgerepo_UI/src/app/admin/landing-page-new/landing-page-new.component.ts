import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/module-service/department.service';
import { FormGroup } from '@angular/forms';


export class Company{
  constructor(public companyId:number,public companyName:string){}
}

export class Topic{
  constructor(public topicsId:number,public topicName:string){}
}

@Component({
  selector: 'app-landing-page-new',
  templateUrl: './landing-page-new.component.html',
  styleUrls: ['./landing-page-new.component.css']
})


export class LandingPageNewComponent implements OnInit {

  public showCompany:boolean=false;
  public listCompany:Array<Company>;
  public listTopic:Array<Topic>;
  public errorMessage:string;
  public error:boolean=false;
  public showListTopic:boolean=false;
  public companyId:number;
  public topicId:number;
  public addQues:boolean=false;
  public addquestionData:FormGroup;

  constructor(private depServices:DepartmentService) { }

  ngOnInit() {
    this.depServices.getCompanyName().subscribe(
      resp=>{
        this.listCompany=resp;
      },
      err=>{
          this.errorMessage="'Server Error /Server Unreachable!";
          this.error=true;
      }
    );
    this.depServices.getTopic().subscribe(
      resp=>{
        this.listTopic=resp;
      },
      err=>{
        this.errorMessage="Server Error /Server Unreachable!";
        this.error=true;
      }
    );
  }
  showClient(){
    this.showCompany=!this.showCompany;
    this.showListTopic=false;
  }

  showTopics(){
    this.showListTopic=!this.showListTopic;
    this.showCompany=false;
  }

  getComapnyId(id){
    console.log('company id ',id);
    this.companyId=id;
  }

  getTopicId(id){
    console.log('topic id ',id);
    this.topicId=id;
  }
  addQuestion(){
    this.addQues=!this.addQues;
  }

  onsubmit(){
    
  }

}
