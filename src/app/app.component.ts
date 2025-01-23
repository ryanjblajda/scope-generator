import { Component, OnInit } from '@angular/core';
import data from '../assets/scope_questions.json';
import { QuestionList } from './components/interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Scope Generator';
  questions:QuestionList = data;

  ngOnInit() {

  }
}
