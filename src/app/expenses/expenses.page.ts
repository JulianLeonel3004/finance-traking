import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Expenses } from '../core/expenses';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  expensesForm:FormGroup;
  typeOffForm:FormGroup;
  expenses:Expenses = new Expenses();
  total:number = 0;
  realTotal:number = 0;

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

    this.typeOffForm = this.formbuilder.group({
      off: new FormControl("", Validators.compose([
        Validators.required
      ]))
    });
  }

  public ngOnInit() { 
    this.storage.create();
    this.storage.get("expenses")
    .then(value => {
      if(value != null) { 
        this.expenses = value;
        this.calculateInitialTotal();
      }
      else
        this.expenses = new Expenses();
    })
    .catch(()=>{
      this.expenses = new Expenses();
    })


  }

  public addExpenses(valueForm) {
    this.expenses.products.push(valueForm);

    this.expensesForm.controls.price.setValue(null);
    this.expensesForm.controls.description.setValue(null);
    
    this.plusTotal(valueForm.price);
  }

  public typeOff(typeOffForm) {
    this.expenses.off = typeOffForm.off;
    this.plusTotal(0);
  }

  public clearTypeOff() {
    this.expenses.off = 0;
    this.realTotal = this.total;
  }

  public saveExpenses() {
    this.storage.create();
    this.storage.set("expenses",this.expenses);
  }

  /***PRIVATE***/

  private plusTotal(price:number) {
    this.total += price;
    
    this.realTotal = this.total - this.calculateOff(this.total);
  }

  private calculateOff(applyOff:number) {
    return this.expenses.off != 0
            ? (this.expenses.off * applyOff) /100 
            : 0;
  }

  private calculateInitialTotal() {

    this.expenses.products.forEach(item => {
      this.total += item.price;
    });


    if(this.expenses.off > 0) {
      this.typeOffForm.controls.off.setValue(this.expenses.off);
      this.plusTotal(0);
    }
    else
      this.realTotal = this.total;

  }

}
