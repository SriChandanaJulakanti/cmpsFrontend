import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStudentDataComponent } from './upload-student-data.component';

describe('UploadStudentDataComponent', () => {
  let component: UploadStudentDataComponent;
  let fixture: ComponentFixture<UploadStudentDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadStudentDataComponent]
    });
    fixture = TestBed.createComponent(UploadStudentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
