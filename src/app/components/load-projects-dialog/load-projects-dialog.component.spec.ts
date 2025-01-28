import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadProjectsDialogComponent } from './load-projects-dialog.component';

describe('LoadProjectsDialogComponent', () => {
  let component: LoadProjectsDialogComponent;
  let fixture: ComponentFixture<LoadProjectsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadProjectsDialogComponent]
    });
    fixture = TestBed.createComponent(LoadProjectsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
