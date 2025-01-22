import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit{
  @Input() item:any;

  name = signal<string>("Section");
  questions = signal<any>([]);

  ngOnInit(): void {
    this.name.set(this.item['name']);
    console.log(this.item['questions']);
    this.questions.set(this.item['questions']);
  }
}
