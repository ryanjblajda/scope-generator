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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/scope_questions.json').subscribe((data) => {
      this.data = data;
      console.log(this.data); // Log the data to the console
    });
  }
}
