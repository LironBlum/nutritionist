import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations'
import { ProductService } from '../product.service';
import { UserInputComponent } from '../user-input/user-input.component'
import { UserInputService } from '../user-input.service';
import { MealsService } from '../meals.service';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss'],
  animations:[
    trigger('products',[
      transition('* => *',[
        query(':enter',style({ opacity: 0 }),{optional: true}),

        query(':enter',stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 0,transform: 'translateY(-75%)',offset: 0}),
            style({opacity: .5,transform: 'translateY(35%)',offset: .3}),
            style({opacity: 1,transform: 'translateY(0)',offset: 1}),
          ]))]),{optional: true}),

          query(':leave',stagger('300ms',[
            animate('.6s ease-in',keyframes([
              style({opacity: 1,transform: 'translateY(0)',offset: 0}),
              style({opacity: .5,transform: 'translateY(35%)',offset: .3}),
              style({opacity: 0,transform: 'translateY(-75%)',offset: 1}),
            ]))]),{optional: true})
      ])
    ])
  ]
})
export class FridgeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an item';
  productText: string = '';
  quantityText: string = '';
  unitText: string = '';
  products = [];

  constructor(private _product: ProductService, private userInputService: UserInputService, private mealsSrv: MealsService) { }

  ngOnInit() {
    this.itemCount = this._product.products.length;
  }
  addItem(){
    var product = {name:this.productText, quantity:this.quantityText, unit:this.unitText}
    this._product.products.push(product);
    this.productText = "";
    this.itemCount = this._product.products.length;
  }

  removeItem(i) {
    this.products.splice(i, 1);
    this.itemCount = this._product.products.length;
  }


  getMealOptions(event: Event) {
    const userData = {
      constrains: this._product.constraints,
      products: this._product.products
    }

    this.userInputService.sendUserInput(userData) //send to userData microservice
      .subscribe(res => {
        this.mealsSrv.meals = res;
      });
  }
}




