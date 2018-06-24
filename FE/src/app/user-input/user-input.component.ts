import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompileMetadataResolver } from '@angular/compiler';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { UserInput } from '../models/userInput';
import { UserInputService } from '../user-input.service';
import { MealsService } from '../meals.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent implements OnInit {
  rForm: FormGroup;
  post:any;                     
  maxCal:number;
  carbs:number;
  fats:number;
  proteins:number;
  products = [];
  meals: Object = {};
  constrains: Object = {};

  constructor(private fb: FormBuilder, private data: MealsService, private router: Router, private _product: ProductService) { 
    this.rForm = fb.group({
      'maxCal' : [null, Validators.compose([Validators.required, Validators.min(600)])],
      'carbs' : [null, Validators.compose([Validators.required, Validators.min(20)])],
      'fats' : [null, Validators.compose([Validators.required, Validators.min(5)])],
      'proteins' : [null, Validators.compose([Validators.required, Validators.min(20)])],
    });
  }

  ngOnInit() {}

  addConstrains(input): void {   

    this._product.constraints = {
      "maxCal": input.maxCal,
      "carbs": input.carbs,
      "fats": input.fats,
      "proteins": input.proteins
    }
    
    this.router.navigate(['fridge']); //redirect to fridge to enter products
  }
}

