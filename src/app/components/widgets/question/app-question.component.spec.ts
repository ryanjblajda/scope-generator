import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppQuestionComponent } from './question.component';

describe('AppQuestionComponent', () => {
  let component: AppQuestionComponent;
  let fixture: ComponentFixture<AppQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppQuestionComponent]
    });
    fixture = TestBed.createComponent(AppQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
