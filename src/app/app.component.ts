import { Component, OnInit } from '@angular/core';
//import data from '../assets/scope_questions.json';
import { QuestionList } from './components/interfaces/interfaces';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Scope Generator';
  questions!:QuestionList;
  projectNumber = signal<string>('PR-XXXXX');
  projectDescription = signal<string>('a small huddle room');
  projectClientName = signal<string>('company or school name');
  success = signal<boolean>(false);
  loading = signal<boolean>(true);

  private httpClient: HttpClient;

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit() {
    try {
      this.httpClient.get('assets/scope_questions.json', {responseType: 'text'}).subscribe(data => {
        //console.log(data);
        try {
          this.questions = JSON.parse(data) as QuestionList;
          this.success.set(true);
        }
        catch(error) {
          console.log(error);
        }
      });
    }
    catch(error) {
      console.log(error);
    }

    this.loading.set(false);
  }

  generateScope():void {
    console.log(this.questions);
  }
}
