import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentInfoModule } from './studentInfo/student-info.module';
import { BalanceSheetComponent } from './balanceSheet/balance-sheet.component';
import { BalanceSheetModule } from './balanceSheet/balance-sheet.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { UploadStudentDataComponent } from './upload-student-data/upload-student-data.component';
import { AddConcentrationCourseComponent } from './add-concentration-course/add-concentration-course.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UploadStudentDataComponent,
    AddConcentrationCourseComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StudentInfoModule,
    BalanceSheetModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [HttpClient,
    BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
