import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  total:number = 15093;

  constructor(private navController:NavController) {}

  goToExpenses() {
    this.navController.navigateForward('/list-expenses');
  }

}
