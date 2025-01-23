import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { signal } from '@angular/core';
import { Answer } from '../../interfaces/interfaces';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  standalone: true,
})
export class AnswerComponent implements OnInit, OnChanges {
  @Input() item!:Answer;

  prompt = signal<string>("Question");
  selected = signal<boolean>(false);

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.prompt.set(this.item.prompt)
  }
}
