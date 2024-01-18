import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { Concentration } from 'src/shared/models/concentration.model';
import { StudentInfoService } from 'src/shared/service/student/student-info.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
})
export class StudentInfoComponent {
  
  uNumber: string = '';
  studentData : any = {};
  concentrationInfo : Map<number, Concentration> ;
  concentrations : any = [];
  courseInfo : Map<String, Array<Object>>;
  courseInfo2 : Array<Map<String, Array<Object>>>;
  show: boolean = false;

  constructor(private studentInfoService : StudentInfoService
    ) { }

    ngOnInit() {
      this.getConcentrations();
    }  

  onSubmit(): void {
    this.studentInfoService.getStudentInfo(this.uNumber).subscribe((data) => {
      if (data.statusCode === 'SUCCESS') {
        for (const eachCourse of data.response.courses) {
          this.concentrationInfo[eachCourse.concentrationCode].courses[eachCourse.courseId] = eachCourse;
        }
        this.concentrations = Object.values(this.concentrationInfo);
        this.getSize();
        var htmlContent = document.getElementById("balanceSheet").innerHTML;
        console.log(htmlContent);
            var newWindow = window.open('about:blank', '_blank', 'width=1200,height=1200');
            newWindow.document.close();
            setTimeout(() => {
              newWindow.document.write(document.getElementById("balanceSheet").innerHTML);
            }, 5000);

              const styles = document.getElementsByTagName('style');

            
              for (let i = 0; i < styles.length; i++) {
                newWindow.document.write(styles[i].outerHTML);
              }
              newWindow.document.write('<link rel="stylesheet" href="../styles.css" type="text/css" />');
      } else {
        console.log(data.message);
      }
    });
  }

  getConcentrations(): void {
    this.studentInfoService.getConcentrationInfo().subscribe((data) => {
      if (data.statusCode === 'SUCCESS') {
        this.concentrationInfo = data.response;
      } else {
        console.log(data.message);
      }
    });
}

  getSize(): void {
    let total = 0;
    this.courseInfo2 = new Array();
    this.courseInfo = new Map();
    for (const each of this.concentrations) {
      this.courseInfo.set(each.name, []);
      for (let [key, value] of Object.entries(each.courses)) {
        total++;
        this.courseInfo.get(each.name).push(value);
        if (total % 45 === 0) {
          this.courseInfo2.push(this.courseInfo);
          this.courseInfo = new Map();
          this.courseInfo.set(each.name, []);
          total = 0;
        }
     }
    }
    this.courseInfo2.push(this.courseInfo);
    console.log(this.courseInfo2);
  }

  public convetToPDF(){
    html2canvas(document.getElementById("balanceSheet")).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('new-file.pdf'); // Generated PDF
      });
  }

  refresh() {
    this.uNumber = '';
  }

}