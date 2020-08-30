import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  createQuestion(addQuestions): Observable<any> {
    var create: { 'clientId': number, 'jobFunction': string, 'question': string, 'answer': string, 'topic': string } =
     { 'clientId': addQuestions.clientId, 'jobFunction': addQuestions.jobFunction, 'question': addQuestions.question, 'answer': addQuestions.answer, 'topic': addQuestions.topic };
    return this.http.post(this.baseUrl + '/api/dropbox/admin/addQuestion', create
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }

}
