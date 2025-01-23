import { Component, OnInit } from '@angular/core';
import data from '../assets/scope_questions.json';
import { QuestionList } from './components/interfaces/interfaces';
import { signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Scope Generator';
  questions:QuestionList = data;
  projectNumber = signal<string>('PR-XXXXX');
  projectDescription = signal<string>('a small huddle room');
  projectClientName = signal<string>('company or school name')


  ngOnInit() {

  }

  generateScope():void {
    console.log(this.questions);
  }
}
