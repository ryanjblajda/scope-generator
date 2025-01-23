import { Component, OnInit } from '@angular/core';
import data from '../assets/scope_questions.json';
import { QuestionList } from './components/interfaces/interfaces';
import { SectionComponent } from './components/section/section.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'scope-generator';
  questions:QuestionList = data;

  ngOnInit() {

  }
}
