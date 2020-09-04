import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/module-service/department.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';
import { QuestionService } from '../QuestionService/question.service';


export class Company {
  constructor(public companyId: number, public companyName: string) { }
}

export class Topic {
  constructor(public topicsId: number, public topicName: string) { }
}

export class ShowQuestion {
  constructor(public questionId: number, public question: string, public askedBy: string, public clientName: string,
    public questionDate: string, public answer: string, public answerdBy: string, public answeredDate: string) { }
}

export class saveAnswer{
  constructor(public questionId:number,public answer:string,public emailUser:string){}
}

export class saveAnswerResponse{
  constructor(public msg:string,public status:string){}
}

export class saveQuestion{
  constructor(public clientId:number,public topic:string,public question:string,public userEmail:string){}
}

@Component({
  selector: 'app-landing-page-new',
  templateUrl: './landing-page-new.component.html',
  styleUrls: ['./landing-page-new.component.css']
})


export class LandingPageNewComponent implements OnInit {

  public showCompany: boolean = false;
  public listCompany: Array<Company>;
  public listTopic: Array<Topic>;
  public errorMessage: string;
  public error: boolean = false;
  public showListTopic: boolean = false;
  public companyId: number;
  public topicName: string;
  public addQues: boolean = false;
  public addquestionData: FormGroup;
  public placeholder: string = 'Maximum 200 words';
  public isLoggedIn: boolean = false;
  public userRole: string;
  public question: string;
  public showAllQuestionList: Array<ShowQuestion>;
  public answerData: FormGroup;
  public answer: any = false;
  public closediv:boolean=false;
  public openAnswer:boolean=false;
  public saveAnserRep:saveAnswerResponse;
  setMessage: any = {};
  msg: String; status: String;
  public addquesNoError:boolean=false;
  public addquesError:boolean=false;
  public closeErrorDiv:boolean=false;


  constructor(private depServices: DepartmentService, private router: Router, private _storage: StorageService
    , private formBuilder: FormBuilder, private questionService: QuestionService) { }

  editorStyle = {
    height: '100px',
    backgroundColor: 'white'

  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],

      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }]
    ]
  }

  ngOnInit() {
    this.questionService.getAllQuestion().subscribe(
      resp => {
        this.showAllQuestionList = resp;
      },
      err => {
        this.errorMessage = "'Server Error /Server Unreachable!";
        this.error = true;
      }
    );
    this.depServices.getCompanyName().subscribe(
      resp => {
        this.listCompany = resp;
      },
      err => {
        this.errorMessage = "'Server Error /Server Unreachable!";
        this.error = true;
      }
    );
    this.depServices.getTopic().subscribe(
      resp => {
        this.listTopic = resp;
      },
      err => {
        this.errorMessage = "Server Error /Server Unreachable!";
        this.error = true;
      }
    );
    this.addquestionData = this.formBuilder.group({
      editor: ['', [Validators.required, Validators.maxLength(200)]]
    });
    this.answerData = this.formBuilder.group({
      answereditor: ['', [Validators.required, Validators.maxLength(200)]]
    });

    this.isLoggedIn = this._storage.getSession('isAuthenticated');
    this.userRole = this._storage.getSession('userRole');
  }

  dashboard() {
    if (this._storage.getSession('userRole') === 'Admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user']);
    }
  }

  logout() {
    sessionStorage.clear();
    this.isLoggedIn = false;
  }
  closeErrorFromDiv() {
    this.error = false;
  }
  closeErrorFromCard() {
    this.error = false;
  }

  maxlength(e) {

    if (e.editor.getLength() > 200) {
      e.editor.deleteText(200, e.editor.getLength());
    }
  }

  showClient() {
    this.showCompany = !this.showCompany;
    this.showListTopic = false;
  }

  showTopics() {
    this.showListTopic = !this.showListTopic;
    this.showCompany = false;
  }
  giveAnswer(k) {
    this.answer=k;
    this.answerData.controls['answereditor'].setValue('');
    // this.answer = !this.answer;
  }

  askQuestion(){
    this.addquestionData.controls['editor'].setValue('');
    this.topicName=null;
    this.companyId=null;
  }

close(){
  this.closediv=!this.closediv;
}  


  getComapnyId(id) {

    this.companyId = id;
  }

  getTopicId(name) {

    this.topicName = name;
  }
  checkPermission() {
    let isUserLoggedIn = this._storage.getSession('isAuthenticated');
    if (isUserLoggedIn) {
      this.addQues = !this.addQues;
    } else {
      this.router.navigate(['/login']);
    }
  }

  checkPermission1() {
    let isUserLoggedIn = this._storage.getSession('isAuthenticated');
    if (isUserLoggedIn) {
      this.openAnswer = !this.openAnswer;
    } else {
      this.router.navigate(['/login']);
    }
  }

  onsubmit() {

    if(this.companyId==null){
      this.addquesError=true;
      this.setMessage = { message: "Client is missing", error: true };
    }
    else if(this.topicName==null){
      this.addquesError=true;
      this.setMessage = { message: "Topic is missing", error: true };
    }
    else{
    let q=this.addquestionData.get('editor').value;
    let temp=document.createElement("div");
    temp.innerHTML=q;
    this.question=temp.innerText;
    let email=this._storage.getSession('eMail');
    let output=new saveQuestion(this.companyId,this.topicName,q,email);
    this.questionService.saveQuestion(output).subscribe(
      resp=>{
        this.saveAnserRep=resp;
        if(this.saveAnserRep.status==='Success'){
          this.addquesNoError=true;
          this.setMessage = { message: this.saveAnserRep.msg, msg: true };
        }
        this.questionService.getAllQuestion().subscribe(
          resp => {
            this.showAllQuestionList = resp;
          }
        );
      },
      err=>{
        this.addquesError=true;
        this.setMessage = { message: this.saveAnserRep.msg, error: true };
      }
    );

    }
  }

  onAnswerSubmit(id) {
    let tempAns=this.answerData.get('answereditor').value;
    let tempDiv=document.createElement("div");
    tempDiv.innerHTML=tempAns;
    let ans=tempDiv.innerText;
    let email=this._storage.getSession('eMail');
    let output=new saveAnswer(id,tempAns,email);
    this.questionService.saveAnswer(output).subscribe(
      resp=>{
        this.saveAnserRep=resp;
        if(this.saveAnserRep.status==='Success'){
          this.closeErrorDiv=true;
          this.setMessage = { message: this.saveAnserRep.msg, msg: true };
                   
        }
        this.questionService.getAllQuestion().subscribe(
          resp => {
            this.showAllQuestionList = resp;
          }
        );
      },err=>{
        this.closeErrorDiv=true;
        this.setMessage = { message: this.saveAnserRep.msg, error: true };
      }
    );
  }

  signIn() {
    this.router.navigate(['/login']);
  }

  signUp() {
    this.router.navigate(['/signup']);
  }
}
