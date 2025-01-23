import { Component, OnInit } from '@angular/core';
import * as data from '../assets/scope_questions.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'scope-generator';

  sections:any;

  ngOnInit() {
    this.sections = data.sections;
  }
}
