import { Component, Input, OnInit, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports:[NgFor, AnswerComponent]
})

export class AppQuestionComponent implements OnInit {
  @Input() item:any;

  name = signal<string>('Question');
  prompt = signal<string>('Prompt');
  answers = signal<any>([]);

  ngOnInit(): void {
    this.name.set(this.item['name']);
    this.prompt.set(this.item['prompt']);
    this.answers.set(this.item['answers']);
  }
}
