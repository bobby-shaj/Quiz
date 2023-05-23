import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Question } from '../question';
import { FinishedComponent } from '../finished/finished.component';


@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {
  quizId: string | null = null;
  questions: Question[] | null = null;
  step = 0;

  constructor(public api: ApiService, private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('quizId');
    this.api.getQuestions(this.quizId).subscribe((res:any) => {
      this.questions = res;
      this.questions?.forEach(q => {
        q.answers = [q.correctAnswer, q.answer1, q.answer2, q.answer3];
        shuffle(q.answers);
      });
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  finish() {
    var correct = 0;
    this.questions?.forEach(q => {
      if (q.correctAnswer == q.selectedAnswer)
        correct++
    });

    this.dialog.open(FinishedComponent, {
      data: { correct, total: this.questions?.length }
    });
    console.log(correct)
  }
}

function shuffle(a: any) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}
