import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MealsService {
    meals: any = [];
    constructor() {}
}