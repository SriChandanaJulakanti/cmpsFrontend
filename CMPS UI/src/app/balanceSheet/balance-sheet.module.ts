import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BalanceSheetComponent } from './balance-sheet.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    BalanceSheetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  exports: [BalanceSheetComponent],
})
export class BalanceSheetModule { }