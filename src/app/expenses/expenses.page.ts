import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Product } from '../core/product';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  expensesForm:FormGroup;
  expenses:Array<Product>;

  constructor(private formbuilder:FormBuilder,
    private storage:Storage) { 

    this.expensesForm = this.formbuilder.group({
      price: new FormControl("", Validators.compose([
        Validators.required
      ])),

      description: new FormControl("", Validators.compose([
        Validators.maxLength(40)
      ]))
    });
  }

  ngOnInit() {
    
    this.storage.create();
    this.storage.get("expends")
    .then(value => {
      this.expenses = value;
    })
    .catch(()=>{
      this.expenses = new Array();
    })


  }

  addExpenses(valueForm) {
    this.expenses.push(valueForm);
    this.expensesForm.controls.price.setValue(null);
    this.expensesForm.controls.description.setValue(null);

    this.storage.create();
    this.storage.set("expend",this.expenses);


  }

}
