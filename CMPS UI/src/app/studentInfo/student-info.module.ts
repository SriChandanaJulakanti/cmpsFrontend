import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StudentInfoComponent } from './student-info.component';
import { StudentInfoService } from 'src/shared/service/student/student-info.service';
import { FormsModule } from '@angular/forms';
import { BalanceSheetModule } from '../balanceSheet/balance-sheet.module';
import { CommonModule } from '@angular/common';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BalanceSheetComponent } from '../balanceSheet/balance-sheet.component';

@NgModule({
  declarations: [
    StudentInfoComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    BalanceSheetModule
  ],
  providers: [
    StudentInfoService,
  ],
  exports: [StudentInfoComponent],
})
export class StudentInfoModule { }