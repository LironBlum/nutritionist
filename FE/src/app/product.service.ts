import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductService {
  
  private products = new BehaviorSubject<any>(['product 1', 'product 2']);
  product = this.products.asObservable();
  
  constructor() { }

  changeProduct(product){
    this.products.next(product); 
   }

}