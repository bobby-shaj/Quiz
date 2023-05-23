import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Quiz } from '../quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Quiz;

  constructor(public api: ApiService) {
    this.quiz = new Quiz();
  }

  ngOnInit() {
    this.api.quizSelected.subscribe((quiz:Quiz)=> this.quiz = quiz);
  }

  createQuiz() {
    this.quiz = new Quiz();
  }

}
