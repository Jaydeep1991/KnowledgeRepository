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
  public topicId: number;
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
        console.log(this.showAllQuestionList);
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
    // this.answer = !this.answer;
  }

close(){
  this.closediv=!this.closediv;
}  


  getComapnyId(id) {

    this.companyId = id;
  }

  getTopicId(id) {

    this.topicId = id;
  }
  addQuestion() {
    let isUserLoggedIn = this._storage.getSession('isAuthenticated');
    if (isUserLoggedIn) {
      this.addQues = !this.addQues;
    } else {
      this.router.navigate(['/login']);
    }
  }

  onsubmit() {
    this.question = this.addquestionData.value;

  }

  onAnswerSubmit() {

  }

  signIn() {
    this.router.navigate(['/login']);
  }

  signUp() {
    this.router.navigate(['/signup']);
  }
}
