import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  total:number = 15093;
  inputForm:FormGroup;
  input:number=0;
  expenses:number=0;

  constructor(private navController:NavController, 
    private storage:Storage,
    private formBuilder:FormBuilder) {

      this.inputForm = formBuilder.group({
        input: new FormControl("", Validators.compose([
          Validators.required
        ]))
      })  
  }

  ngOnInit() {
   /* this.storage.create();
    this.storage.get("input")
    .then(value => {
      if(value != null){
        this.input = value;
      }
    })
    .catch(()=>{
      alert("ocurrio un error")
    })



    this.storage.get("expenseList")
    .then(expList => {
        if(expList){
          expList.forEach(item => {
            item.products.forEach(prod => {
              this.expenses += prod.price
            });
          });
        }
    })*/
  }
  

  goToExpenses() {
    this.navController.navigateForward('/list-expenses');
  }

}
