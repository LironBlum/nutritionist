import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations'
import { ProductService } from '../product.service';

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
  productText: string = 'first product';
  products = [];

  constructor(private _product: ProductService) { }

  ngOnInit() {
    this._product.product.subscribe(res => this.products = res);
    this._product.changeProduct(this.products);//update product after a change
    this.itemCount = this.products.length;
  }
  addItem(){
    this.products.push(this.productText);
    this.productText = "";
    this.itemCount = this.products.length;
    this._product.changeProduct(this.products);//update product after a change
  }

  removeItem(i) {
    this.products.splice(i, 1);
    this._product.changeProduct(this.products); //update product after a change
    this.itemCount = this.products.length;
  }

}


