import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompileMetadataResolver } from '@angular/compiler';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { UserInput } from '../models/userInput';
import { UserInputService } from '../user-input.service';


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
  
  constructor(private fb: FormBuilder, private userInputService: UserInputService) { 
    this.rForm = fb.group({
      'maxCal' : [null, Validators.compose([Validators.required, Validators.min(600)])],
      'carbs' : [null, Validators.compose([Validators.required, Validators.min(20)])],
      'fats' : [null, Validators.compose([Validators.required, Validators.min(5)])],
      'proteins' : [null, Validators.compose([Validators.required, Validators.min(20)])],
    });
  }

  ngOnInit() {
  }

  addPost(post): void {   

    const input = {
      "maxCal": post.maxCal,
      "carbs": post.carbs,
      "fats": post.fats,
      "proteins": post.proteins
    }
    
    this.userInputService.sendUserInput(input)
      .subscribe(input => {
        console.log(input)
      });
  }

}

