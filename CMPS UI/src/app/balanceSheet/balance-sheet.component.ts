import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { StudentInfoService } from '../../shared/service/student/student-info.service';
import { Concentration } from 'src/shared/models/concentration.model';
import { Course } from 'src/shared/models/course.model';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
})
export class BalanceSheetComponent {
  
  courses : any = [ {'name' : 'CMPS Seminar I', 'csno' : '110B', 'hr' : '3', 'gr' : '3.7', 'sem' : '3', 'yr' : '2022'}, 
  {'name' : 'CMPS Seminar II', 'csno' : '110B', 'hr' : '3', 'gr' : '3.7', 'sem' : '3', 'yr' : '2022'},
  {'name' : 'Discrete Structures', 'csno' : '110B', 'hr' : '3', 'gr' : '3.7', 'sem' : '3', 'yr' : '2022'},
  {'name' : 'Data Structures', 'csno' : '110B', 'hr' : '3', 'gr' : '3.7', 'sem' : '3', 'yr' : '2022'},
  {'name' : 'Java', 'csno' : '110B', 'hr' : '3', 'gr' : '3.7', 'sem' : '3', 'yr' : '2022'}];

  studentData : any = {};
  concentrationInfo: Map<number, Concentration> = new Map<number, Concentration>();
  concentrations : any = [];
  courseInfo : Map<String, Array<Object>>;
  courseInfo2 : Array<Map<String, Array<Object>>>;
  modalRef: BsModalRef;
  studentName: '';
  UNumber: '';

  @ViewChild('balanceSheetModal') balanceSheetModal: any;
  @Output() triggerRefresh = new EventEmitter<any>();

  constructor(private studentInfoService : StudentInfoService,
    private modalService: BsModalService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.getConcentrations();
  }

  showModal(uNumber: string) {
    this.getStudentInfo(uNumber);
    this.modalRef = this.modalService.show(
      this.balanceSheetModal,
      {
        class: '',
        ignoreBackdropClick: true
      }
    );
  }

  getStudentInfo(uNumber: string): void {
    this.studentInfoService.getStudentInfo(uNumber).subscribe((data) => {
      if (data.statusCode === 'SUCCESS') {
        for (const eachCourse of data.response.courses) {
          if(eachCourse.concentrationCode === 1015){
            this.concentrationInfo[1015].courses.push(eachCourse);
            continue;
          }
          this.concentrationInfo[eachCourse.concentrationCode].courses[eachCourse.courseId] = eachCourse;
        }
        this.concentrations = Object.values(this.concentrationInfo);
        this.studentName = data.response.firstName;
        this.UNumber = data.response.unumber;
        this.getSize();
        console.log(this.concentrations);
      } else {
        console.log(data.message);
      }
    });
  }

  getConcentrations(): void {
    this.studentInfoService.getConcentrationInfo().subscribe((data) => {
      if (data.statusCode === 'SUCCESS') {
        this.concentrationInfo = data.response;
        this.concentrationInfo[1015].courses= [];
        this.concentrationInfo[1015].name = 'OTHERS';
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
        if (total % 35 === 0) {
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
    html2canvas(document.getElementById("balanceSheetPrint")).then(canvas => {
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
      // const element = document.getElementById("balanceSheetPrint");
      // const pdf = new jspdf('p', 'mm', 'a4');
      // const pageHeight = pdf.internal.pageSize.height;
      // const totalHeight = element.scrollHeight;
      // let currentPosition = 0;
  
      // function captureAndAddPage() {
      //     html2canvas(element, { useCORS: true, scrollY: currentPosition }).then(canvas => {
      //         const imgWidth = pdf.internal.pageSize.width;
      //         const imgHeight = canvas.height * imgWidth / canvas.width;
  
      //         pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
  
      //         currentPosition += pageHeight;
  
      //         if (currentPosition < totalHeight) {
      //             pdf.addPage();
      //             window.scrollTo(0, currentPosition);
      //             setTimeout(captureAndAddPage, 500); // Adjust the delay as needed
      //         } else {
      //             pdf.save("newFile" || 'generated-pdf.pdf');
      //             window.scrollTo(0, 0); // Scroll back to the top after capturing
      //         }
      //     });
      // }
  
      // captureAndAddPage();
  
  // Example usage:
  // captureAndSavePDF('balanceSheetPrint', 'my-pdf-file.pdf');
  
  
  }

  hide(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.triggerRefresh.emit();
    this.getConcentrations();
   }

  // downloadReports(): void {

  //         this.studentInfoService.reportDownloadUrl().subscribe((data) => {
  //           const studentReport = new Blob([data], {
  //             type: 'application/pdf'
  //           });
  //           const fileURL = URL.createObjectURL(studentReport);
  //           window.open(fileURL, '_blank');
  //         });
  //       }

  keepOrder = (a, b) => {
    return 0;
  };

}