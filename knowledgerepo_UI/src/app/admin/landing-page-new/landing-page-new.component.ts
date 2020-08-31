import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/module-service/department.service';
import { FormGroup, FormControl } from '@angular/forms';


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

  constructor(private depServices:DepartmentService) { }
  editorStyle={
    height:'150px',
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
  }

  maxlength(e){
    console.log(e);
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
