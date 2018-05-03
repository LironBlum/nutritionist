import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompileMetadataResolver } from '@angular/compiler';


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
  
  

  constructor(private fb: FormBuilder) { 
    this.rForm = fb.group({
      'maxCal' : [null, Validators.compose([Validators.required, Validators.min(600)])],
      'carbs' : [null, Validators.compose([Validators.required, Validators.min(20)])],
      'fats' : [null, Validators.compose([Validators.required, Validators.min(5)])],
      'proteins' : [null, Validators.compose([Validators.required, Validators.min(20)])],
    });
  }

  addPost(post) { //handle input
    this.maxCal = post.maxCal;
    this.carbs = post.carbs;
    this.fats = post.fats;

    console.log(this.carbs);
    
    this.proteins = post.proteins;
  }

  ngOnInit() {
  }

}
