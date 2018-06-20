import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompileMetadataResolver } from '@angular/compiler';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { UserInput } from '../models/userInput';
import { UserInputService } from '../user-input.service';
import { MealsService } from '../meals.service';
import { Router } from '@angular/router';


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

  meals: Object = {};

  
  constructor(private fb: FormBuilder, private userInputService: UserInputService, private data: MealsService, private router: Router) { 
    this.rForm = fb.group({
      'maxCal' : [null, Validators.compose([Validators.required, Validators.min(600)])],
      'carbs' : [null, Validators.compose([Validators.required, Validators.min(20)])],
      'fats' : [null, Validators.compose([Validators.required, Validators.min(5)])],
      'proteins' : [null, Validators.compose([Validators.required, Validators.min(20)])],
    });
  }

  ngOnInit() {
    this.data.curMeals.subscribe(meals => this.meals = meals)
  }

  addPost(post): void {   

    const input = {
      "maxCal": post.maxCal,
      "carbs": post.carbs,
      "fats": post.fats,
      "proteins": post.proteins
    }
    //redirect to frige to enter products
    this.router.navigate(['fridge']); // home path: ''

    this.userInputService.sendUserInput(input) //send to userData microservice
      .subscribe(input => {
        this.newMeals(input);

        console.log(input)
      });
  }

  newMeals(results) {
    this.data.addMeals(results);
  }

}

