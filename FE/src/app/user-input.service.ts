import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInput } from './models/userInput';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable()
export class UserInputService {
  private UserInputURL = `http://localhost:9300/nutritionist/v1/updateUserData`;
  public meals$: Observable<any[]>

  sendUserInput(newInput): Observable<any> {     
 
    return this.http.post<any>(this.UserInputURL, newInput, httpOptions).pipe(
      tap((newInput) => {
        this.meals$ = newInput;

        //console.log(`user input = ${JSON.stringify(newInput)}`)
  }),
      catchError(error => of())
    );
  }
  constructor(private http: HttpClient) {}

}