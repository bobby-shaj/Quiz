import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Quiz } from '../quiz';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizList: Quiz[] = [];

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.api.getQuizList().subscribe((res:any) => {
      this.quizList = res;
      console.log(this.quizList);
    });
  }
}
