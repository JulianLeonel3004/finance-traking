import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListExpensesPageRoutingModule } from './list-expenses-routing.module';

import { ListExpensesPage } from './list-expenses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListExpensesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ListExpensesPage]
})
export class ListExpensesPageModule {}
