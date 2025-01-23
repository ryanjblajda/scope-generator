import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRecursiveComponent } from './question-recursive.component';

describe('QuestionRecursiveComponent', () => {
  let component: QuestionRecursiveComponent;
  let fixture: ComponentFixture<QuestionRecursiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionRecursiveComponent]
    });
    fixture = TestBed.createComponent(QuestionRecursiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
