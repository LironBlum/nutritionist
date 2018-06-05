import { Component, OnInit } from '@angular/core';
import { UserInputService } from '../user-input.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {

  constructor(private _meals: UserInputService) { }
 
  ngOnInit() {
   
  }

}
