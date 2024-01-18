import { Component } from '@angular/core';
import { StudentInfoService } from 'src/shared/service/student/student-info.service';

@Component({
  selector: 'app-add-concentration-course',
  templateUrl: './add-concentration-course.component.html',
  styleUrls: ['./add-concentration-course.component.css']
})
export class AddConcentrationCourseComponent {
  showConcentrationForm = false;
  showCourseForm = false;
  concentrationName: string;
  courseId: string;
  courseName: string;
  selectedConcentration: number;
  courseHours: number;
  concentrations = {};
  alertMessage: string;
  concentrationAlertMessage: string; 
 // This should be populated with real data

 constructor(private studentInfoService: StudentInfoService) {}

  toggleForm(formType: string): void {
    this.showConcentrationForm = formType === 'concentration';
    this.showCourseForm = formType === 'course';
  }

  ngOnInit(): void {
    this.studentInfoService.getConcentrations().subscribe(data => {
      this.concentrations = data;
    });
  }

  submitConcentration(): void {
    // Check if concentrationName is not empty
    if (!this.concentrationName) {
      console.error("Concentration Name is required.");
      return; // Exit the method if concentrationName is empty
    }
  
    // Call the service to add the concentration
    this.studentInfoService.addConcentration(this.concentrationName, "admin").subscribe
      ({
        next: response => {
          this.concentrationAlertMessage  = 'Concentration added successfully';
        },
        error: error => {
          this.concentrationAlertMessage  = error.message;
            console.error('There was an error!', error);
        }
    });
  }

  showForm(formType: string): void {
    this.showConcentrationForm = formType === 'concentration';
    this.showCourseForm = formType === 'course';
  }
  keys(obj: any): string[] {
    return Object.keys(obj);
  }

  submitCourse(): void {
    console.log("Course Name:", this.courseName, "Concentration:", this.selectedConcentration);

    // Prepare the course data
    const courseData = {
      courseId: this.courseId,
      courseName: this.courseName,
      concentrationCode: this.selectedConcentration,
      hours: this.courseHours,
      createdBy: "admin" // Assuming a default value for createdBy
    };

    // Call the service method to add the course
    this.studentInfoService.addCourse(courseData).subscribe
    ({
      next: response => {
        this.alertMessage = response;
      },
      error: error => {
          this.alertMessage = error.message;
          console.error('There was an error!', error);
      }
  });
  }
  }
