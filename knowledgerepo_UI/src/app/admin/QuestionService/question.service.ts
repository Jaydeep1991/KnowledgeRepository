import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAllQuestion():Observable<any>{
      return this.http.get(this.baseUrl+"/api/question/findAllQuestionAndAnswer");
  }

  saveAnswer(data):Observable<any>{
    return this.http.post(this.baseUrl+"/api/question/addAnswer",data);
  }

  saveQuestion(data):Observable<any>{
    return this.http.post(this.baseUrl+"/api/question/addQuestion",data);
  }
}
