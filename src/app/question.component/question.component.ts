import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question: Question;

  quizId: string = '';

  constructor(public api: ApiService, private route: ActivatedRoute) {
    this.question = new Question(); 
  }

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('quizId')!;
    this.api.questionSelected.subscribe(question => this.question = question);
  }

  post(question: Question) {
    this.quizId = this.route.snapshot.paramMap.get('quizId')!;
    if (this.quizId == '') {
      console.log("no quiz id.")
    } else {
      let val = parseInt(this.quizId);
      console.log("val value: " + val);
      question.quizId = val;
      this.api.postQuestion(question);
    }
  }

  createQuestion(): void {
    this.question = new Question();
  }
}
