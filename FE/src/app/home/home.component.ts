import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products = [];

  constructor( private router: Router, private _product: ProductService) { }

  ngOnInit() {}

  goToUserInput(){
    this.router.navigate(["userInput"]); 
  }
}
