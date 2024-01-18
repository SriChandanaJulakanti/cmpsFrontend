import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentInfoComponent } from './studentInfo/student-info.component';
import { AppComponent } from './app.component';
import { BalanceSheetComponent } from './balanceSheet/balance-sheet.component';
import { UploadStudentDataComponent } from './upload-student-data/upload-student-data.component';
import { AddConcentrationCourseComponent } from './add-concentration-course/add-concentration-course.component';



const routes: Routes = [
  { path: 'studentInfo', component: StudentInfoComponent},
  { path: 'balanceSheet', component: BalanceSheetComponent},
  { path:'uploadStudentData', component: UploadStudentDataComponent },
  {path:'addConcentrationCourseComponent', component: AddConcentrationCourseComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}