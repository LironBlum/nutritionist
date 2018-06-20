import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductService {
  
  private products = new BehaviorSubject<any>([]);
  product = this.products.asObservable();
  
  constructor() { }

  changeProduct(product){
    this.products.next(product); 
    console.log(product)
   }

}
