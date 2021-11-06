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
  typeOffForm:FormGroup;
  expenses:Array<Product>;
  total:number = 0;
  off:number = 0;

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

  ngOnInit() { 
    this.storage.create();
    this.storage.get("expends")
    .then(value => {
      if(value != null) { 
        this.expenses = value;
        this.calculateInitialTotal();
      }
      else
        this.expenses = new Array();
    })
    .catch(()=>{
      this.expenses = new Array();
    })


  }

  addExpenses(valueForm) {
    this.expenses.push(valueForm);
    this.expensesForm.controls.price.setValue(null);
    this.expensesForm.controls.description.setValue(null);
    
    this.plusTotal(valueForm.price);

    this.storage.create();
    this.storage.set("expends",this.expenses);
  }

  plusTotal(price:number) {
    this.total += this.calculateOff(price);
  }

  calculateInitialTotal() {
    this.total = 0;

    this.expenses.forEach(item => {
      this.total += item.price;
    });
  }

  typeOff() {

    this.off = this.typeOffForm.controls.off.value;

    this.total -= this.total - this.calculateOff(this.total);
  }

  calculateOff(applyOff:number) {
    return (this.off * applyOff) /100;
  }

}
