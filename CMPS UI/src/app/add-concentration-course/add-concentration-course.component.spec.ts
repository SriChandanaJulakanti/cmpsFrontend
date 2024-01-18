import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConcentrationCourseComponent } from './add-concentration-course.component';

describe('AddConcentrationCourseComponent', () => {
  let component: AddConcentrationCourseComponent;
  let fixture: ComponentFixture<AddConcentrationCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConcentrationCourseComponent]
    });
    fixture = TestBed.createComponent(AddConcentrationCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
