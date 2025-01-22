import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  standalone: true,
})
export class AnswerComponent {
  @Input() item:any;
}
