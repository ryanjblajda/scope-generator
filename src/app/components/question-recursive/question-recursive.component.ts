import { Component, Input } from '@angular/core';
import { Answer, Question } from '../interfaces/interfaces';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-question-recursive',
  templateUrl: './question-recursive.component.html',
  styleUrls: ['./question-recursive.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf]
})
export class QuestionRecursiveComponent {
  @Input() question!:Question;

  onAnswerClicked(answer:Answer): void {
    this.question.answers.forEach(item => {
      if (item == answer) { item.selected = true; }
      else { item.selected = false}
    });
  }
}
