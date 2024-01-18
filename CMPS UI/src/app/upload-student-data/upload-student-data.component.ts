import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { take, tap } from 'rxjs';
import { StudentInfoService} from 'src/shared/service/student/student-info.service';

@Component({
  selector: 'app-upload-student-data',
  templateUrl: './upload-student-data.component.html',
  styleUrls: ['./upload-student-data.component.css']
})
export class UploadStudentDataComponent {
  selectedFile?: File;
  progress = 0;
  message = '';

  constructor(private studentInfoService: StudentInfoService) {}

  onFileSelected(event: any): void {
    this.progress = 0;
    this.message = '';
    this.selectedFile = event.target.files[0];
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFile) {
      this.studentInfoService.uploadFile(this.selectedFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = 'File uploaded successfully!';
          }
        },
        error: (err: any) => {
          console.error('Error:', err);
          this.progress = 0;
          this.message = 'Upload Failed: The Excel file contains invalid data, ensure all the required fields are filled correctly. Refer to the sample template for guidance.';
        }
      });
    }
  }
}