import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MealsService {
    private meals = new BehaviorSubject([]);
    curMeals = this.meals.asObservable();
    constructor() {}

    addMeals(meals){
        this.meals.next(meals);
    }
}