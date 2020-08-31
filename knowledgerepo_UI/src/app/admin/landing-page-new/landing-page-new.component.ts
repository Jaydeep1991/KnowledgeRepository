import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/module-service/department.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';


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
  public placeholder:string='Maximum 100 words';
  public isLoggedIn:boolean=false;

  constructor(private depServices:DepartmentService,private router:Router,private _storage:StorageService) { }
  editorStyle={
    height:'100px',
    backgroundColor:'white'

  }

  config={
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],       
      ['blockquote', 'code-block'],
  
      [{ 'header': 1 }, { 'header': 2 }],               
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],     
      [{ 'indent': '-1'}, { 'indent': '+1' }],         
      [{ 'direction': 'rtl' }],                        
  
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],         
      [{ 'font': [] }],
      [{ 'align': [] }]
    ]   
  }

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
    this.addquestionData=new FormGroup({
      editor:new FormControl('')
    });
    this.isLoggedIn=this._storage.getSession('isAuthenticated');
  }

  closeErrorFromDiv(){
    this.error=false;
  }
  closeErrorFromCard(){
    this.error=false;
  }

  maxlength(e){

    if(e.editor.getLength() > 100){
      e.editor.deleteText(100,e.editor.getLength());
    }
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

    this.companyId=id;
  }

  getTopicId(id){

    this.topicId=id;
  }
  addQuestion(){
    let isUserLoggedIn=this._storage.getSession('isAuthenticated');
    if(isUserLoggedIn){
      this.addQues=!this.addQues;
    }else{
      this.router.navigate(['/login']);
    }  
  }

  onsubmit(){
    
  }

  signIn(){
    this.router.navigate(['/login']);
  }

  signUp(){
    this.router.navigate(['/signup']);
  }
}
