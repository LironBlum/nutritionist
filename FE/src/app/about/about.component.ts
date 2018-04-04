import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //to use a path parameter
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { ProductService } from '../product.service';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  products: any;

  constructor(private route: ActivatedRoute, private router: Router, private _product: ProductService ) { 
    this.route.params.subscribe(res => console.log(res.id))
  }

  ngOnInit() {
    this._product.product.subscribe(res => this.products = res)
  }

  sendMeHome() {
    this.router.navigate(['']); // home path: ''
  }

}
