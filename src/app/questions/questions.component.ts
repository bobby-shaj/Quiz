import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any = [];

  constructor(public api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('quizId');
    if (id != null) {
      this.api.getQuestions(id).subscribe(
        (res: any | null) => {
          if (res != null) { this.questions = res; console.log(res); }
          else { console.log("no questions were returned.") }
        });
    }
  }
}
