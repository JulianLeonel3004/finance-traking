import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Expenses } from '../core/expenses';
import { Storage } from '@ionic/storage';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.page.html',
  styleUrls: ['./list-expenses.page.scss'],
})
export class ListExpensesPage implements OnInit {

  expensesList:Array<Expenses>;
  createExpensesForm:FormGroup;

  constructor(private storage:Storage,
    private formbuilder:FormBuilder,
    private route:Router) {

      this.createExpensesForm = this.formbuilder.group({
        name: new FormControl("", Validators.compose([
          Validators.required
        ]))
      });
  }

  ngOnInit() {
    this.storage.create();
    this.storage.get(environment.tables.expensesList)
    .then( list => {
      if(list == null)
        this.expensesList = new Array();
      else
        this.expensesList = list;
    })
    .catch(()=> {
      this.expensesList = new Array();
    })
  }

  createExpenses(createExpensesFormValue) {
    this.goToExpenses(createExpensesFormValue.name);
  }

  goToExpenses(name) {
    this.route.navigateByUrl(environment.routes.expenses +'/' + name);
  }
  
  

}
