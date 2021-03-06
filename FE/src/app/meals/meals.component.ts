import { Component, OnInit } from '@angular/core';
import { MealsService } from '../meals.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit {
  meals: Object = {};

  constructor(private data: MealsService) { }
 
  ngOnInit() {}
}
