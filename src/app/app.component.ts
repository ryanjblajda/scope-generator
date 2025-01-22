import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'scope-generator';

  data: any;
  sections: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/scope_questions.json').subscribe((data) => {
      this.data = data;
      this.sections = this.data['sections'];
      console.log(this.sections);
    });
  }
}
