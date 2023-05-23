import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Question } from './question';
import { Quiz } from './quiz';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private selectedQuestion = new Subject<Question>();
  questionSelected = this.selectedQuestion.asObservable();

  private selectedQuiz = new Subject<Quiz>();
  quizSelected = this.selectedQuiz.asObservable();


  constructor(private http: HttpClient) { }

  getQuestions(quizId: string | null = null): any | null{
    let questions = this.http.get(`https://localhost:7160/api/questions/${quizId}`);
    if (questions != null) {
      return questions;
    } else {
      return null;
    }
  }

  postQuestion(question: Question) {
    this.http.post(`https://localhost:7160/api/questions/`, question).subscribe(
      (res) => {
        console.log(res);
      },
      (exception) => {
        console.log("in post question. no quiz matches this questions id.");
      });
  }

  putQuestion(question: Question) {
    this.http.put(`https://localhost:7160/api/questions/${question.id}`, question).subscribe(res => {
      console.log(res);
    })
  }

  selectQuestion(question: Question) {
    this.selectedQuestion.next(question);
  }

  getQuizList() {
    return this.http.get('https://localhost:7160/api/quizzes');
  }

  getAllQuizzes() {
    return this.http.get<Quiz[]>('https://localhost:7160/api/quizzes/all');
  }

  putQuiz(quiz: Quiz) {
    this.http.put(`https://localhost:7160/api/quizzes/${quiz.id}`, quiz).subscribe(res => {
      console.log(res);
    })
  }

  postQuiz(quiz: Quiz) {
    this.http.post('https://localhost:7160/api/quizzes', quiz).subscribe(res => {
      console.log(res);
    })
  }

  selectQuiz(quiz: Quiz) {
    this.selectedQuiz.next(quiz);
  }

}
