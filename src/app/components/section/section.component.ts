import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Section } from '../classes/interfaces';
import { QuestionRecursiveComponent } from '../question-recursive/question-recursive.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  standalone: true,
  imports: [NgFor, QuestionRecursiveComponent]
})
export class SectionComponent {
  @Input() section!:Section;
}
